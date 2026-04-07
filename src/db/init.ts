import { SQLiteDatabase } from "expo-sqlite";

export async function initDb(db: SQLiteDatabase) {
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

  await db.execAsync(`
    pragma journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS weapons (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      weapon_type TEXT NOT NULL CHECK (weapon_type IN ("greatsword" , "longsword" , "sword_and_shield" , "dual_blades", "hammer" , "hunting_horn" , "lance" , "gunlance" , "switch_axe", "charge_blade" , "insect_glaive" , "light_bowgun" , "heavy_bowgun" , "bow")),
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
      armor_type TEXT NOT NULL CHECK (armor_type IN ("helm" , "chest" , "gloves" , "waist", "legs")),
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
      helm_id INTEGER,
      chest_id INTEGER,
      gloves_id INTEGER,
      waist_id INTEGER,
      legs_id INTEGER,
      charm_id INTEGER,

      FOREIGN KEY(weapon_id) REFERENCES weapons(id),
      FOREIGN KEY(helm_id) REFERENCES armor(id),
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
}