# spool — 3D Printing & Store Skill Specification

This document defines the skills, capabilities, profiles, and printing specifications for models provided by **spool studio**.

## 1. 3D Print Profiles & Slicing Specifications

### Bambu Lab X1-Carbon / P1P / A1 Mini Defaults
- **Nozzle Size:** 0.4mm (Hardened Steel recommended)
- **Layer Height:** 0.2mm Standard (0.12mm High Detail)
- **Infill Pattern:** Gyroid @ 15% (Strength focus: 25% 3D Honeycomb)
- **Wall Loops:** 3 minimum (4 for mechanical components)
- **Top/Bottom Layers:** 4 top, 4 bottom
- **Supports:** Tree (Auto) @ 30° threshold angle where required
- **Bed Temperature:** 60°C (Textured PEI Plate)
- **Hotend Temperature:** 220°C (PLA Basic / Matte)

## 2. File Format Guidelines

| Extension | Target Usage | Slicer Support | Notes |
| --------- | ------------ | -------------- | ----- |
| `.3mf` | Production Print Presets | Bambu Studio, OrcaSlicer, PrusaSlicer | Includes color data & plate settings |
| `.stl` | Generic 3D Mesh Data | Universal | Standard mesh, requires slicer profiling |
| `.glb` | 3D Web Viewer | Browser / Three.js | Embedded PBR material textures |
| `.pdf` | Press & Print Guides | Any PDF Reader | Dimensional drawings & assembly steps |

## 3. Licence & Distribution Policy

- **Standard License:** Creative Commons CC BY-NC 4.0 (Attribution-NonCommercial)
- **Attribution Format:** `Designed by spool studio (spool.store)`
- **Commercial Use:** Requires active commercial subscription tier or explicit authorization.
