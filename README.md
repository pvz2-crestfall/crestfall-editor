# How to use the Crestfall Editor

Crestfall Editor is a Custom PvZ2 level editor made for the "PvZ2: Crestfall" Mod that streamlines easy creation of new or modification of pre-existing levels. Here's how to use it if this is your first time creating levels.

1. Open ```https://crestfall-editor.pages.dev/``` in your browser, preferably Google Chrome. It is recommended to use a Laptop or PC for this, however, this still works on Mobile.
2. There are 4 major sections, 'General Properties', 'Level Module', 'Wave Manager' and 'Save/Load'
   - 'General Properties', as the name suggests, determines the level and plant selection properties.
   - 'Level Module' is responsible for additional layers to the level, it be minigame or challenges. The Conveyor Belt property can be found here.
   - 'Wave Manager' is responsible for creating and modifying the level's wave system, or dynamic mechanics that are built on the wave system
   - You can export created levels or import pre-existing ones under 'Save/Load'. You can also create saved level templates through the save function, and the editor has an auto-save function to save 'backups' in case of accidental page closures or data erasures. Do note that level files must be a .json file type. (i.e. Ancient Egypt level 1 is 'EGYPT1.json')
3. The editor creates a blank level template on the first page load. Firstly, you should modify the world, level, name, sun and seed chooser properties. It is always set to 'Ancient Egypt', default 'Chooser' and 'Sun Drops' setting.
4. After this, the Level module allows toggling of Conveyor property, as well as modifying the lawn. There are also Challenge and Minigame modules to use.
   - Note that when you enable the Conveyor module, you should set the Sun Option Sun Dropper and Seed Chooser Selection Method variables to 'Disabled'.
   - Mold Colonies do not load when you import pre-existing levels and must be re-added as such.
5. Next is the wave manager, where you create the progression at which Zombies spawn and dynamic level changes under the the actions in each wave. The wave manager is split into 'Wave' and 'Settings'. 'Wave' is composed of many ordered "Wave - Actions", where under each attribute, you can create actions to the wave. Each wave by default comes with the 'Basic Zombie Spawner' wave option where you can decide the type and order of zombies to spawn, as well as the lanes they spawn in. 'Settings' determines progression at which waves spawn and the overall makeup of the waves. While wave count automatically follows the number of "Wave" attributes, other attributes set to default are left to the game to handle and could vary across versions.
   - Note that 'Next Wave Health' variable is a range of 0~1 where the Min and Max determines the boundary. Ensure that Min is lesser than Max. Any number higher than 1 is rounded to 1, and any less than 0 is rounded to 0.
6. After you are satisfied with your creation, you can choose to export the level to the folder of your choice. Otherwise, you can also import existing levels, or create saves if you wish to work on unfinished levels at later date.

And that should be all! Have fun using the Crestfall Editor and unleash your creativity!
