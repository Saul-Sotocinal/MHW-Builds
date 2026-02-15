# Project Proposal

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
![alt text](./assets/ui-concept.png)

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