" [onedark.vim](https://github.com/joshdick/onedark.vim/)

let s:overrides = get(g:, "onedark_color_overrides", {})

let s:colors = {
      \ "red": get(s:overrides, "red", { "gui": "#FF6188", "cterm": "204", "cterm16": "1" }),
      \ "dark_red": get(s:overrides, "dark_red", { "gui": "#E64069", "cterm": "196", "cterm16": "9" }),
      \ "green": get(s:overrides, "green", { "gui": "#A9DC76", "cterm": "114", "cterm16": "2" }),
      \ "yellow": get(s:overrides, "yellow", { "gui": "#FFD866", "cterm": "180", "cterm16": "3" }),
      \ "dark_yellow": get(s:overrides, "dark_yellow", { "gui": "#FC9867", "cterm": "173", "cterm16": "11" }),
      \ "blue": get(s:overrides, "blue", { "gui": "#78DCE8", "cterm": "39", "cterm16": "4" }),
      \ "purple": get(s:overrides, "purple", { "gui": "#AB9DF2", "cterm": "170", "cterm16": "5" }),
      \ "cyan": get(s:overrides, "cyan", { "gui": "#78E8D7", "cterm": "38", "cterm16": "6" }),
      \ "white": get(s:overrides, "white", { "gui": "#FCFCFA", "cterm": "145", "cterm16": "7" }),
      \ "black": get(s:overrides, "black", { "gui": "#29272A", "cterm": "235", "cterm16": "0" }),
      \ "visual_black": get(s:overrides, "visual_black", { "gui": "NONE", "cterm": "NONE", "cterm16": "0" }),
      \ "comment_grey": get(s:overrides, "comment_grey", { "gui": "#5A555C", "cterm": "59", "cterm16": "15" }),
      \ "gutter_fg_grey": get(s:overrides, "gutter_fg_grey", { "gui": "#5A555C", "cterm": "238", "cterm16": "15" }),
      \ "cursor_grey": get(s:overrides, "cursor_grey", { "gui": "#464247", "cterm": "236", "cterm16": "8" }),
      \ "visual_grey": get(s:overrides, "visual_grey", { "gui": "#39363B", "cterm": "237", "cterm16": "15" }),
      \ "menu_grey": get(s:overrides, "menu_grey", { "gui": "#39363B", "cterm": "237", "cterm16": "8" }),
      \ "special_grey": get(s:overrides, "special_grey", { "gui": "#4E494F", "cterm": "238", "cterm16": "15" }),
      \ "vertsplit": get(s:overrides, "vertsplit", { "gui": "#1E1C1F", "cterm": "59", "cterm16": "15" }),
      \}

function! onedark#GetColors()
  return s:colors
endfunction
