import { SQLiteDatabase } from "expo-sqlite";

export async function initDb(db: SQLiteDatabase) {
  // await reset(db)

  await db.execAsync(`
    pragma journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS weapons (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ("great-sword" , "long-sword" , "sword-and-shield" , "dual-blades", "hammer" , "hunting-horn" , "lance" , "gunlance" , "switch-axe", "charge-blade" , "insect-glaive" , "light-bowgun" , "heavy-bowgun" , "bow")),
      element TEXT NOT NULL CHECK (element IN ("raw", "fire", "thunder", "dragon", "water", "ice", "blast", "paralysis", "poison", "sleep")),
      attack INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS monsters (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      element TEXT NOT NULL CHECK (element IN ("raw", "fire", "thunder", "dragon", "water", "ice", "blast", "paralysis", "poison", "sleep")),
      classification TEXT NOT NULL CHECK (classification IN ("bird wyvern" , "brute wyvern" , "fanged wyvern" , "fanged beast", "flying wyvern" , "piscine wyvern" , "relict" , "elder dragon"))
    );

    CREATE TABLE IF NOT EXISTS armor (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ("head" , "chest" , "gloves" , "waist", "legs")),
      defense INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      max_level INTEGER
    );

    CREATE TABLE IF NOT EXISTS charms (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT DEFAULT "charm" CHECK (type in ("charm")),
      skill_id INTEGER,

      FOREIGN KEY(skill_id) REFERENCES skills(id)
    );

    CREATE TABLE IF NOT EXISTS armor_skills (
      armor_skills INTEGER PRIMARY KEY AUTOINCREMENT,
      armor_id INTEGER,
      skill_id INTEGER,
      skill_level INTEGER,
      FOREIGN KEY(armor_id) REFERENCES armor(id),
      FOREIGN KEY(skill_id) REFERENCES skills(id)
    );

    CREATE TABLE IF NOT EXISTS builds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      weapon_id INTEGER NOT NULL,
      head_id INTEGER,
      chest_id INTEGER,
      gloves_id INTEGER,
      waist_id INTEGER,
      legs_id INTEGER,
      charm_id INTEGER,

      FOREIGN KEY(weapon_id) REFERENCES weapons(id),
      FOREIGN KEY(head_id) REFERENCES armor(id),
      FOREIGN KEY(chest_id) REFERENCES armor(id),
      FOREIGN KEY(gloves_id) REFERENCES armor(id),
      FOREIGN KEY(waist_id) REFERENCES armor(id),
      FOREIGN KEY(legs_id) REFERENCES armor(id),
      FOREIGN KEY(charm_id) REFERENCES charms(id)
    );

    CREATE TABLE IF NOT EXISTS builds_target_monsters (
      builds_target_monsters_id INTEGER PRIMARY KEY AUTOINCREMENT,
      build_id INTEGER,
      monster_id INTEGER,
      FOREIGN KEY(build_id) REFERENCES builds(id),
      FOREIGN KEY(monster_id) REFERENCES monsters(id)
    );
  `)

  await db.runAsync(`
    INSERT OR REPLACE INTO weapons (id, name, type, element, attack)
    VALUES (-1, "None", "great-sword", "raw", 0)`
  )
  await db.runAsync(`
    INSERT OR REPLACE INTO armor (id, name, type, defense)
    VALUES (-1, "None", "head", 0)`
  )
  await db.runAsync(`
    INSERT OR REPLACE INTO armor (id, name, type, defense)
    VALUES (-2, "None", "chest", 0)`
  )
  await db.runAsync(`
    INSERT OR REPLACE INTO armor (id, name, type, defense)
    VALUES (-3, "None", "gloves", 0)`
  )
  await db.runAsync(`
    INSERT OR REPLACE INTO armor (id, name, type, defense)
    VALUES (-4, "None", "waist", 0)`
  )
  await db.runAsync(`
    INSERT OR REPLACE INTO armor (id, name, type, defense)
    VALUES (-5, "None", "legs", 0)`
  )
  await db.runAsync(`
    INSERT OR REPLACE INTO charms (id, name)
    VALUES (-1, "None")`
  )

  // fetchWeaponData()
  // fetchArmorData()
  // fetchCharmsData()

  // await seed(db)
}

async function reset(db: SQLiteDatabase) {
  await db.execAsync(`
    DROP TABLE IF EXISTS weapons;
    DROP TABLE IF EXISTS monsters;
    DROP TABLE IF EXISTS armor;
    DROP TABLE IF EXISTS skills;
    DROP TABLE IF EXISTS charms;
    DROP TABLE IF EXISTS armor_skills;
    DROP TABLE IF EXISTS builds;
    DROP TABLE IF EXISTS builds_target_monsters;
  `);
}

async function seed(db: SQLiteDatabase) {
  await db.runAsync(`
    INSERT INTO weapons (id, name, type, element, attack)
    VALUES (10, "Purgation's Atrocity", "great-sword", "dragon", 210);`
  )
  await db.runAsync(`
    INSERT INTO weapons (id, name, type, element, attack)
    VALUES (170, "Hunter's Knife 1", "sword-and-shield", "raw", 80);`
  )

  await db.runAsync(`
    INSERT INTO armor (id, name, type, defense)
    VALUES (1, "Leather Headgear", "head", 2);`
  )
  await db.runAsync(`
    INSERT INTO armor (id, name, type, defense)
    VALUES (2, "Leather Mail", "chest", 2);`
  )
  await db.runAsync(`
    INSERT INTO armor (id, name, type, defense)
    VALUES (3, "Leather Gloves", "gloves", 2);`
  )
  await db.runAsync(`
    INSERT INTO armor (id, name, type, defense)
    VALUES (4, "Leather Belt", "waist", 2);`
  )
  await db.runAsync(`
    INSERT INTO armor (id, name, type, defense)
    VALUES (5, "Leather Trousers", "legs", 2);`
  )

  await db.runAsync(`
    INSERT INTO skills (id, name, max_level)
    VALUES (1, "Poison Resistance", 3);`
  )

  await db.runAsync(`
    INSERT INTO charms (id, name, skill_id)
    VALUES (234, "Poison Charm 1", 1);`
  )
}