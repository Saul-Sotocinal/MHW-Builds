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

export async function getBuilds(db: SQLiteDatabase): Promise<Build[]> {
  return db.getAllAsync('SELECT * FROM builds ORDER BY id DESC')
}

export async function getBuild(db: SQLiteDatabase, id: number): Promise<Build | null> {
  return db.getFirstAsync(`SELECT * FROM builds WHERE id = ?`, id)
}

export async function addBuild(db: SQLiteDatabase, name: string): Promise<number> {
  return (await db.runAsync('INSERT INTO builds (name) VALUES (?)', name)).lastInsertRowId
}

export async function updateBuild(db: SQLiteDatabase, newBuild: Build): Promise<Build> {
  await db.runAsync(`
    UPDATE builds
    SET name = ?,
        weapon_id = ?
        helm_id = ?,
        chest_id = ?,
        gloves_id = ?,
        waist_id = ?,
        legs_id = ?
        charm_id = ?
    WHERE id = ?
    LIMIT 1`,
    newBuild.name, newBuild.weapon.id, newBuild.helm.id, newBuild.chest.id, newBuild.gloves.id,
    newBuild.waist.id, newBuild.legs.id, newBuild.talisman.id, newBuild.id
  )

  return (await db.getFirstAsync('SELECT * FROM builds WHERE id = ?', newBuild.id))!
}

export async function deleteBuild(db: SQLiteDatabase, id: number): Promise<number> {
  return (await db.runAsync('DELETE FROM builds WHERE id = ?', id)).lastInsertRowId
}


export async function getMonsters(db: SQLiteDatabase): Promise<Monster[]> {
  return db.getAllAsync('SELECT * FROM monsters ORDER BY id DESC')
}

export async function getMonster(db: SQLiteDatabase, id: number): Promise<Monster | null> {
  return db.getFirstAsync('SELECT * FROM monsters WHERE id = ?', id)
}

export async function addMonster(db: SQLiteDatabase, monster: Monster): Promise<number> {
  return (await db.runAsync(
    'INSERT INTO monsters (name, element, classification) VALUES (?, ?, ?)',
    monster.name, monster.element, monster.classification
  )).lastInsertRowId
}


export async function getWeapons(db: SQLiteDatabase): Promise<Weapon[]> {
  return db.getAllAsync('SELECT * FROM weapons ORDER BY id DESC')
}

export async function getWeapon(db: SQLiteDatabase, id: number): Promise<Weapon | null> {
  return db.getFirstAsync('SELECT * FROM weapons WHERE id = ?', id)
}

export async function addWeapon(db: SQLiteDatabase, newWeapon: Weapon): Promise<number> {
  return (await db.runAsync(
    'INSERT INTO weapons (name, weapon_type, element, attack) VALUES (?, ?, ?, ?)',
    newWeapon.name, newWeapon.type, newWeapon.element, newWeapon.damage
  )).lastInsertRowId
}

export async function getArmors(db: SQLiteDatabase): Promise<Armor[]> {
  return db.getAllAsync('SELECT * FROM armor ORDER BY id DESC')
}

export async function getArmorsByType(db: SQLiteDatabase, type: ArmorType): Promise<Armor[]> {
  return db.getAllAsync('SELECT * FROM armor WHERE armor_type = ?', type)
}

export async function getArmor(db: SQLiteDatabase, id: number): Promise<Armor | null> {
  return db.getFirstAsync('SELECT * FROM armor WHERE id = ?', id)
}

export async function getArmorByType(db: SQLiteDatabase, id: number, type: ArmorType): Promise<Armor | null> {
  return db.getFirstAsync(
    'SELECT * FROM armor WHERE id = ? AND armor_type = ?',
    id,
    type
  )
}

export async function addArmor(db: SQLiteDatabase, newArmor: Armor): Promise<number> {
  return (await db.runAsync(
    'INSERT INTO armor (name, armor_type, defense) VALUES (?, ?, ?)',
    newArmor.name, newArmor.type, newArmor.defense
  )).lastInsertRowId
}

export async function getCharms(db: SQLiteDatabase): Promise<Charm[]> {
  return db.getAllAsync('SELECT * FROM charms ORDER BY id DESC')
}

export async function getCharm(db: SQLiteDatabase, id: number): Promise<Charm | null> {
  return db.getFirstAsync('SELECT * FROM charms WHERE id = ?', id)
}

export async function addCharm(db: SQLiteDatabase, newCharm: Charm): Promise<number> {
  return (await db.runAsync(
    'INSERT INTO charms (name) VALUES (?)',
    newCharm.name
  )).lastInsertRowId
}