# Project Proposal

## Part 1

### App Concept
An app where you can make equipment builds for the game "Monster Hunter World". This would be used by players to keep track of different builds for different situations. Example: A build to use when hunting a specific monster with a specific weapon.

### main interface
```
interface Build {
    id: string;
    name: string;
    weapon: string; // will be replaced with weapon object
    helm?: string; // will be replaced with armor object
    chest?: string; // will be replaced with armor object
    gloves?: string; // will be replaced with armor object
    waist?: string; // will be replaced with armor object
    legs?: string; // will be replaced with armor object
    charm?: string; // will be replaced with decoration object
    decorations: list[string]; // will be replaced with decoration object
    usage: list[string]; // will be replaced with monster object
}
```

### UI Sketches
![alt text](./assets/readme-diagrams/ui-concept.png)

### Component List
- `BuildList`: Renders a flatlist of builds
- `BuildCard`: Displays details of build
- `BuildEquipmentList`: Renders a list of equipment used in a build
- `EquipmentCard`: Displays equiment detail
- `AddBuildForm`: Form to create build
- `EquipmentSelector`: Shows a list of equipment you can use in the build
- `FilterSelector`: Selector to filter by element, by monster, by weapon type, name or skill
- `SortSelector`: Selector to sort by damage, defense, alphabetically or skill

### Filter Options
Filters:
- Builds: Element / Monster / Weapon Type / Name
- Equipment: Skill / Decoration Slots / Name

Sorting: 
- Builds: Damage / Defense / Alphabetically[A-Z, Z-A] / Skill
- Equipment: Damage / Defense / Alphabetically[A-Z, Z-A] / Skill

## Part 2

### Route Plan
/ -> Root (redirects to /(drawer)/builds)

##### Main Routes
/(drawer)/builds -> main screen

/(drawer)/monsters -> to see associated weapons

/(drawer)/profile -> user information (not to be implemented yet)

/(drawer)/hunters -> friends(not to be implemented yet)

/(drawer)/map -> to view hunter friends locations (no to be implemented yet)

##### Item level

/builds/[id] -> build detail (dynamic route)

/builds/[id]/edit -> Edit screen (dynamic route)

##### Other routes

/builds/create -> Create modal (presented over current screen)

### State Diagram
![alt text](./assets/readme-diagrams/state-diagram.png)

### UI Sketches
Editbuild screen and detailedBuild screen which will look like the card from part 1.
![alt text](./assets/readme-diagrams/ui-concept2.png)

## Part 3

###  Data Architecture Plan

##### SQLite Schema

``` sql
CREATE TABLE IF NOT EXISTS builds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
    weapon: 
    helm: 
    chest: 
    gloves: 
    waist: 
    legs: 
    charm:
);

CREATE TABLE IF NOT EXISTS weapons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    weapon_type TEXT NOT NULL CHECK (element IN ("greatsword" , "longsword" , "sword_and_shield" , "dual_blades", "hammer" , "hunting_horn" , "lance" , "gunlance" , "switch_axe", "charge_blade" , "insect_glaive" , "light_bowgun" , "heavy_bowgun" , "bow")),
    element TEXT NOT NULL CHECK (element IN ("raw", "fire", "thunder”, "dragon", "water", "ice", "blast", "paralysis”, "poison", "sleep")),
    attack INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS monsters (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    element TEXT NOT NULL CHECK (element IN ("raw", "fire", "thunder”, "dragon", "water", "ice", "blast", "paralysis”, "poison", "sleep")),
    classification TEXT NOT NULL CHECK (classification IN ("bird wyvern" , "brute wyvern" , "fanged wyvern" , "fanged beast", "flying wyvern" , "piscine wyvern" , "relict" , "elder dragon"))
);

CREATE TABLE IF NOT EXISTS builds_target_monsters (
    builds_id INTEGER,
    monster_id INTEGER,
    FOREIGN KEY(builds_id) REFERENCES builds(id),
    FOREIGN KEY(monster_id) REFERENCES monsters(id)
);
```