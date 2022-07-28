import '~/js/fouc-fix';
// import '@/reach-text-editor/js/all.min.js';

import '@/rich-text-editor/styles/rte.css';

/// Get buttons selector

/// @TODO: Activities
// 2. What Happens on start typing
// 1. What happens on click enter
// 3. Apply formatting style of select text
// 4. Deal with all actions
// - Text Formatting:
//    -> Bold,
//    -> italicize,
//    -> underline,
//    -> strikethrough,
//    -> subscript,
//    -> subscript,
//    -> align/left/right/center/justify,
//    -> indent
//    -> Outdent
// - Advanced Text Manipulations:
//    -> Add List -ol or ul
//    -> Change font size
//    -> Change Font Types
//    -> Change font color
//    -> change font background color
//    -> Add links and remove links
// - Undo and redo function

// ideas
// -> Basic text manipulations, we use document.createElement
// -> For advanced manipulation, we use use templates -> this applies to anchor tags
// -> For font sizes and font families, we add supported font sizes and family {supportedFonts: [], supported: Sizes}
// -> For colors, we use style, color or bg color style
// -> Need to know how to handle adding fonts per element and per document
// -> Need to know how to wrap elements with select api
// -> To handle undo and redo, we use local storage to store current article per minute

export {};
