// Entry point.
//
// Modules are imported in bundle order, with _hoisted.js first: it holds
// declarations the original relied on being hoisted, and importing it early
// reproduces that. ES modules evaluate dependencies first and the rest of
// the graph is acyclic in this order, so this matches the original
// single-scope evaluation order.

import "./_hoisted.js";
import "./00-shaders.js";
import "./01-materials.js";
import "./02-nav.js";
import "./03-geometry.js";
import "./04-builders.js";
import "./05-world.js";
import "./06-infill.js";
import "./07-citizens.js";
import "./08-save.js";
import "./09-catalogue.js";
import "./10-overlays.js";
import "./11-tools.js";
import "./12-requests.js";
import "./13-modes.js";
import "./14-plates.js";
import "./15-audio.js";
import "./16-hud.js";
import "./17-bootstrap.js";
