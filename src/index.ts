// Entry point.
//
// Modules are imported in bundle order, with _hoisted.js first: it holds
// declarations the original relied on being hoisted, and importing it early
// reproduces that. ES modules evaluate dependencies first and the rest of
// the graph is acyclic in this order, so this matches the original
// single-scope evaluation order.

import "./_hoisted";
import "./00-shaders";
import "./01-materials";
import "./02-nav";
import "./03-geometry";
import "./04-builders";
import "./05-world";
import "./06-infill";
import "./07-citizens";
import "./08-save";
import "./09-catalogue";
import "./10-overlays";
import "./11-tools";
import "./12-requests";
import "./13-modes";
import "./14-plates";
import "./15-audio";
import "./16-hud";
import "./17-bootstrap";
import "./19-tutorial"; // first-run walkthrough (brief 8); hand-written, not from the bundle
