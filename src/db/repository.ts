import { DbBuild } from "@/data/equipment_data";
import { Armor, ArmorType, Build, Charm, Monster, Weapon } from "@/types/interfaces";
import { SQLiteDatabase } from "expo-sqlite";

/**
 * Detects SQLite errors caused by Fast Refresh lifecycle races.
 *
 * During Fast Refresh (dev only), React remounts <SQLiteProvider> which closes
 * the old native DB handle. However, in-flight async queries from old useEffect
 * closures may still reference that closed handle, causing "prepareAsync rejected"
 * errors.
 *
 * This function filters those known refresh-time errors so they don't clutter logs.
 * Real database errors will still surface normally.
 */
export function isClosedResourceSqliteError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('prepareAsync') &&
    (message.includes('Access to closed resource') ||
      message.includes('API misuse'))
  );
}

export async function getBuilds(db: SQLiteDatabase, sort: 'name' | 'damage' | 'defense' | 'none' = 'none'): Promise<Build[]> {
  let rows: DbBuild[];
  switch (sort) {
    case "name":
      rows = await db.getAllAsync('SELECT * FROM builds ORDER BY name ASC;')
      break
    case "damage":
      rows = await db.getAllAsync(
        `SELECT * FROM builds as b
        JOIN weapons as w
        ON b.weapon_id = w.id
        ORDER BY w.attack DESC;`
      )
      break
    case "defense":
      rows = await db.getAllAsync(
        `SELECT b.* from armor as a
        JOIN builds as b
        WHERE b.head_id = a.id
        OR b.chest_id = a.id
        OR b.gloves_id = a.id
        OR b.waist_id = a.id
        OR b.legs_id = a.id
        GROUP BY b.id
        ORDER BY sum(defense) DESC;`
      )
      break
    case "none":
      rows = await db.getAllAsync('SELECT * FROM builds ORDER BY id ASC;')
      break
  }

  let builds: Build[] = []

  for (let i = 0; i < rows.length; i++) {
    builds.push({
      id: rows[i].id,
      name: rows[i].name,
      weapon: (await getWeapon(db, rows[i].weapon_id, false))!,
      head: (await getArmor(db, rows[i].head_id, false))!,
      chest: (await getArmor(db, rows[i].chest_id, false))!,
      gloves: (await getArmor(db, rows[i].gloves_id, false))!,
      waist: (await getArmor(db, rows[i].waist_id, false))!,
      legs: (await getArmor(db, rows[i].legs_id, false))!,
      charm: (await getCharm(db, rows[i].charm_id, false))!
    })
  }

  return builds
}

export async function getBuild(db: SQLiteDatabase, id: number): Promise<Build | null> {
  const row: DbBuild | null = await db.getFirstAsync(`SELECT * FROM builds WHERE id = ?;`, id)

  if (row === null)
    return null

  return {
    id: row.id,
    name: row.name,
    weapon: (await getWeapon(db, row.weapon_id, false))!,
    head: (await getArmor(db, row.head_id, false))!,
    chest: (await getArmor(db, row.chest_id, false))!,
    gloves: (await getArmor(db, row.gloves_id, false))!,
    waist: (await getArmor(db, row.waist_id, false))!,
    legs: (await getArmor(db, row.legs_id, false))!,
    charm: (await getCharm(db, row.charm_id, false))!
  }
}

export async function addBuild(db: SQLiteDatabase, name: string): Promise<number> {
  return (await db.runAsync(
    'INSERT OR REPLACE INTO builds (name, weapon_id, head_id, chest_id, gloves_id, waist_id, legs_id, charm_id) VALUES (?, -1, -1, -2, -3, -4, -5, -1);',
    name
  )).lastInsertRowId
}

export async function updateBuild(db: SQLiteDatabase, newBuild: Build): Promise<Build> {
  await db.runAsync(`
    UPDATE builds
    SET name = ?,
        weapon_id = ?,
        head_id = ?,
        chest_id = ?,
        gloves_id = ?,
        waist_id = ?,
        legs_id = ?,
        charm_id = ?
    WHERE id = ?;`,
    newBuild.name, newBuild.weapon.id, newBuild.head.id, newBuild.chest.id, newBuild.gloves.id,
    newBuild.waist.id, newBuild.legs.id, newBuild.charm.id, newBuild.id
  )

  return (await getBuild(db, newBuild.id))!
}

export async function deleteBuild(db: SQLiteDatabase, id: number): Promise<number> {
  return (await db.runAsync('DELETE FROM builds WHERE id = ?;', id)).lastInsertRowId
}


export async function getMonsters(db: SQLiteDatabase): Promise<Monster[]> {
  return db.getAllAsync('SELECT * FROM monsters ORDER BY id ASC;')
}

export async function getMonster(db: SQLiteDatabase, id: number): Promise<Monster | null> {
  return db.getFirstAsync('SELECT * FROM monsters WHERE id = ?;', id)
}

export async function addMonster(db: SQLiteDatabase, monster: Monster): Promise<number> {
  return (await db.runAsync(
    'INSERT OR REPLACE INTO monsters (name, element, classification) VALUES (?, ?, ?);',
    monster.name, monster.element, monster.classification
  )).lastInsertRowId
}


export async function getWeapons(db: SQLiteDatabase, ignoreNone: boolean = true): Promise<Weapon[]> {
  return await db.getAllAsync(`SELECT * FROM weapons ${ignoreNone ? 'WHERE id > 0' : ''};`)
}

export function getWeaponsSync(db: SQLiteDatabase, ignoreNone: boolean = true): Weapon[] {
  return db.getAllSync(`SELECT * FROM weapons ${ignoreNone ? 'WHERE id > 0' : ''};`)
}

export async function getWeapon(db: SQLiteDatabase, id: number, ignoreNone: boolean = true): Promise<Weapon | null> {
  return db.getFirstAsync(`SELECT * FROM weapons WHERE id = ? ${ignoreNone ? 'AND id > 0' : ''};`, id)
}

export async function addWeapon(db: SQLiteDatabase, newWeapon: Weapon): Promise<number> {
  return (await db.runAsync(
    'INSERT OR REPLACE INTO weapons (id, name, type, element, attack) VALUES (?, ?, ?, ?, ?);',
    newWeapon.id, newWeapon.name, newWeapon.type, newWeapon.element, newWeapon.attack
  )).lastInsertRowId
}

export async function getArmors(db: SQLiteDatabase, ignoreNone: boolean = true): Promise<Armor[]> {
  return db.getAllAsync(`SELECT * FROM armor ${ignoreNone ? 'WHERE id > 0' : ''};`)
}

export function getArmorsSync(db: SQLiteDatabase, ignoreNone: boolean = true): Armor[] {
  return db.getAllSync(`SELECT * FROM armor ${ignoreNone ? 'WHERE id > 0' : ''};`)
}

export async function getArmorsByType(db: SQLiteDatabase, type: ArmorType, ignoreNone: boolean = true): Promise<Armor[]> {
  return db.getAllAsync(`SELECT * FROM armor WHERE type = ? ${ignoreNone ? 'AND id > 0' : ''};`, type)
}

export function getArmorsByTypeSync(db: SQLiteDatabase, type: ArmorType, ignoreNone: boolean = true): Armor[] {
  return db.getAllSync(`SELECT * FROM armor WHERE type = ? ${ignoreNone ? 'AND id > 0' : ''};`, type)
}

export async function getArmor(db: SQLiteDatabase, id: number, ignoreNone: boolean = true): Promise<Armor | null> {
  return db.getFirstAsync(`SELECT * FROM armor WHERE id = ? ${ignoreNone ? 'AND id > 0' : ''};`, id)
}

export async function getArmorByType(db: SQLiteDatabase, id: number, type: ArmorType, ignoreNone: boolean = true): Promise<Armor | null> {
  return db.getFirstAsync(
    `SELECT * FROM armor WHERE id = ? AND type = ? ${ignoreNone ? 'AND id > 0' : ''};`,
    id,
    type
  )
}

export async function addArmor(db: SQLiteDatabase, newArmor: Armor): Promise<number> {
  return (await db.runAsync(
    'INSERT OR REPLACE INTO armor (id, name, type, defense) VALUES (?, ?, ?, ?);',
    newArmor.id, newArmor.name, newArmor.type, newArmor.defense
  )).lastInsertRowId
}

export async function getCharms(db: SQLiteDatabase, ignoreNone: boolean = true): Promise<Charm[]> {
  return db.getAllAsync(`SELECT * FROM charms ${ignoreNone ? 'WHERE id > 0' : ''};`)
}

export function getCharmsSync(db: SQLiteDatabase, ignoreNone: boolean = true): Charm[] {
  return db.getAllSync(`SELECT * FROM charms ${ignoreNone ? 'WHERE id > 0' : ''};`)
}

export async function getCharm(db: SQLiteDatabase, id: number, ignoreNone: boolean = true): Promise<Charm | null> {
  return db.getFirstAsync(`SELECT * FROM charms WHERE id = ? ${ignoreNone ? 'AND id > 0' : ''};`, id)
}

export async function addCharm(db: SQLiteDatabase, newCharm: Charm): Promise<number> {
  return (await db.runAsync(
    'INSERT OR REPLACE INTO charms (id, name) VALUES (?, ?);',
    newCharm.id, newCharm.name
  )).lastInsertRowId
}

export async function getNoneWeapon(db: SQLiteDatabase): Promise<Weapon> {
  return (await db.getFirstAsync(`SELECT * FROM weapons WHERE id < 0;`))!
}

export async function getNoneArmorByType(db: SQLiteDatabase, type: ArmorType): Promise<Armor> {
  return (await db.getFirstAsync(`SELECT * FROM armor WHERE id < 0 AND type = ?;`, type))!
}

export async function getNoneCharm(db: SQLiteDatabase): Promise<Charm> {
  return (await db.getFirstAsync(`SELECT * FROM charms WHERE id < 0;`))!
}