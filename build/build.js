#!/usr/bin/env node

const _ = require('lodash') // ships with termcolors; only used because of termcolors customization
const doT = require('dot')
const termcolors = require('termcolors')
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

doT.templateSettings = {
	evaluate:    /<%([\s\S]+?)%>/g,
	interpolate: /<%=([\s\S]+?)%>/g,
	encode:      /<%!([\s\S]+?)%>/g,
	use:         /<%#([\s\S]+?)%>/g,
	define:      /<%##\s*([\w.$]+)\s*(:|=)([\s\S]+?)#%>/g,
	conditional: /<%\?(\?)?\s*([\s\S]*?)\s*%>/g,
	iterate:     /<%~\s*(?:%>|([\s\S]+?)\s*:\s*([\w$]+)\s*(?::\s*([\w$]+))?\s*%>)/g,
	varname: 'it',
	strip: false, // preserve whitespace
}

// Monokai Pro
/*
const baseColors = Object.freeze({
	red: { gui: '#FF6188', cterm: '204', cterm16: '1' }, // alternate cterm: 168
	dark_red: { gui: '#E64069', cterm: '196', cterm16: '9' },
	green: { gui: '#A9DC76', cterm: '114', cterm16: '2' },
	yellow: { gui: '#FFD866', cterm: '180', cterm16: '3' },
	dark_yellow: { gui: '#FC9867', cterm: '173', cterm16: '11' },
	blue: { gui: '#78DCE8', cterm: '39', cterm16: '4' }, // alternate cterm: 75
	purple: { gui: '#AB9DF2', cterm: '170',  cterm16: '5' }, // alternate cterm: 176
	cyan: { gui: '#78E8D7', cterm: '38', cterm16: '6' }, // alternate cterm: 73
	white: { gui: '#FCFCFA', cterm: '145', cterm16 : '7' },
	black: { gui: '#29272A', cterm: '235', cterm16: '0' }
})
*/

// Monokai Pro Machine
/*
const baseColors = Object.freeze({
	red: { gui: '#ff6d7e', cterm: '204', cterm16: '1' }, // alternate cterm: 168
	dark_red: { gui: '#ff6d7e', cterm: '196', cterm16: '9' },
	green: { gui: '#a2e57b', cterm: '114', cterm16: '2' },
	yellow: { gui: '#ffed72', cterm: '180', cterm16: '3' },
	dark_yellow: { gui: '#ffb270', cterm: '173', cterm16: '11' },
	blue: { gui: '#7cd5f1', cterm: '39', cterm16: '4' }, // alternate cterm: 75
	purple: { gui: '#baa0f8', cterm: '170',  cterm16: '5' }, // alternate cterm: 176
	cyan: { gui: '#7cd5f1', cterm: '38', cterm16: '6' }, // alternate cterm: 73
	white: { gui: '#f2fffc', cterm: '145', cterm16 : '7' },
	black: { gui: '#273136', cterm: '235', cterm16: '0' }
})

const specialColors = Object.freeze({
	neutral: { gui: '#BAC9CC', cterm: '59', cterm16: '15' },
	neutral_2: { gui: '#9FB0B3', cterm: '59', cterm16: '15' },
	comment_grey: { gui: '#6b7678', cterm: '59', cterm16: '15' },
	gutter_fg_grey: { gui: '#6b7678', cterm: '238', cterm16: '15' },
	cursor_grey:  { gui: '#5B6466', cterm: '236', cterm16: '8' },
	visual_grey: { gui: '#505759', cterm: '237', cterm16: '15' },
	menu_grey: { cterm16: '8' }, // vim theme handles gui/cterm values
	special_grey: { gui: '#3B4A52', cterm: '238', cterm16: '15' },
	vertsplit: { gui: '#1D2529', cterm: '59', cterm16: '15' },
})
*/

/*
const baseColors = Object.freeze({
	red: { gui: '#924650', cterm: '204', cterm16: '1' }, // alternate cterm: 168
	dark_red: { gui: '#854049', cterm: '196', cterm16: '9' },
	green: { gui: '#666666', cterm: '114', cterm16: '2' },
	yellow: { gui: '#BA9864', cterm: '180', cterm16: '3' },
	dark_yellow: { gui: '#BA8C64', cterm: '173', cterm16: '11' },
	blue: { gui: '#888888', cterm: '39', cterm16: '4' }, // alternate cterm: 75
	purple: { gui: '#4F8396', cterm: '170',  cterm16: '5' }, // alternate cterm: 176
	cyan: { gui: '#777777', cterm: '38', cterm16: '6' }, // alternate cterm: 73
	white: { gui: '#C2C2B0', cterm: '145', cterm16 : '7' },
	black: { gui: '#222222', cterm: '235', cterm16: '0' }
})

const specialColors = Object.freeze({
	neutral: { gui: '#727265', cterm: '59', cterm16: '15' },
	neutral_2: { gui: '#616156', cterm: '59', cterm16: '15' },
	comment_grey: { gui: '#616156', cterm: '59', cterm16: '15' },
	gutter_fg_grey: { gui: '#616156', cterm: '238', cterm16: '15' },
	cursor_grey:  { gui: '#7D7D6F', cterm: '236', cterm16: '8' },
	visual_grey: { gui: '#454545', cterm: '237', cterm16: '15' },
	menu_grey: { cterm16: '8' }, // vim theme handles gui/cterm values
	special_grey: { gui: '#454545', cterm: '238', cterm16: '15' },
	vertsplit: { gui: '#141414', cterm: '59', cterm16: '15' },
})
*/

// Monokai Pro Octagon

const baseColors = Object.freeze({
	red: { gui: '#ff657a', cterm: '204', cterm16: '1' }, // alternate cterm: 168
	dark_red: { gui: '#ff657a', cterm: '196', cterm16: '9' },
	green: { gui: '#bad761', cterm: '114', cterm16: '2' },
	yellow: { gui: '#ffd76d', cterm: '180', cterm16: '3' },
	dark_yellow: { gui: '#ff9b5e', cterm: '173', cterm16: '11' },
	blue: { gui: '#9cd1bb', cterm: '39', cterm16: '4' }, // alternate cterm: 75
	purple: { gui: '#c39ac9', cterm: '170',  cterm16: '5' }, // alternate cterm: 176
	cyan: { gui: '#9cd1bb', cterm: '38', cterm16: '6' }, // alternate cterm: 73
	white: { gui: '#eaf2f1', cterm: '145', cterm16 : '7' },
	black: { gui: '#282a3a', cterm: '235', cterm16: '0' }
})

const specialColors = Object.freeze({
	neutral: { gui: '#9EA3B3', cterm: '59', cterm16: '15' },
	neutral_2: { gui: '#878C99', cterm: '59', cterm16: '15' },
	comment_grey: { gui: '#696d77', cterm: '59', cterm16: '15' },
	gutter_fg_grey: { gui: '#696d77', cterm: '238', cterm16: '15' },
	cursor_grey:  { gui: '#656973', cterm: '236', cterm16: '8' },
	visual_grey: { gui: '#43465C', cterm: '237', cterm16: '15' },
	menu_grey: { cterm16: '8' }, // vim theme handles gui/cterm values
	special_grey: { gui: '#43465C', cterm: '238', cterm16: '15' },
	vertsplit: { gui: '#1E1F2B', cterm: '59', cterm16: '15' },
})


const colors = Object.assign({}, baseColors, specialColors)

const templateMap = Object.freeze({
	'templates/autoload.template.vim': '../autoload/onedark.vim',
	'templates/One Dark.Xresources': '../term/One Dark.Xresources'
})

const shouldCheck = String(process.argv[2]).toLowerCase() === 'check'

const handleError = (message, cause) => {
	console.error('Error:', message)
	if (cause) console.error('Cause:', cause)
	process.exit(-1)
}

console.log(
	shouldCheck ?
		'Checking for inconsistencies between templates and existing output files...'
		:
		'Generating output files from templates...'
)

Object.keys(templateMap).forEach(templateFilename => {

	// Read the template
	const templatePath = resolve(__dirname, templateFilename)
	let templateText
	try {
		templateText = readFileSync(templatePath, 'utf8')
	} catch (e) {
		handleError(`Error reading template ${templatePath}`, e)
	}

	// Compile the template
	let template
	try {
		template = doT.template(templateText)
	} catch (e) {
		handleError(`Error compiling template ${templatePath}`, e)
	}

	// Execute the template (generate the output)
	let output
	try {
		output = template(colors)
	} catch (e) {
		handleError(`Error running template ${templatePath}`, e)
	}

	let outputPath = resolve(__dirname, templateMap[templateFilename])
	try {
		const existingOutput = readFileSync(outputPath, 'utf8')
		// Only need to do something if the generated output differs from what's already on disk
		if (output !== existingOutput) {
			if (shouldCheck) { // Check generated output against existing output file
				handleError(`Changes were made to ${templateMap[templateFilename]} that are inconsistent with its template (${templateFilename}).\nDo you need to [re]build?`)
			} else { // Overwrite existing output file
				try {
					writeFileSync(outputPath, output, 'utf8')
				} catch (e) {
					handleError(`Error writing to output file ${outputPath}`, e)
				}
			}
		}
	} catch (e) {
		handleError(`Error reading existing output file ${outputPath}`, e)
	}

})

try {
	// Use the Xresources theme as a color source since it was generated above via templating
	const xresources = readFileSync(resolve(__dirname, '../term/One Dark.Xresources'), 'utf8')
	const terminalPalette = termcolors.xresources.import(xresources)

	let itermTemplate, terminalAppTemplate, alacrittyTemplate

	// Compile custom terminal color templates based on ones that ship with termcolors
	try {
		itermTemplate = termcolors.export(
			// From termcolors/lib/formats/iterm.js
			readFileSync(resolve(__dirname, 'templates/One Dark.itermcolors')),
			_.partialRight(_.mapValues, function (color) {
				return color.toAvgRgbArray()
			})
		)

		alacrittyTemplate = termcolors.export(
			readFileSync(resolve(__dirname, 'templates/One Dark.alacritty')),
			_.partialRight(_.mapValues, function (color) {
				return color.toHex().slice(1)
			})
		)

		// From termcolors/lib/formats/terminal-app.js
		const code = [
			Buffer.from('62706c6973743030d40102030405061516582476657273696f6e58246f626a65637473592461726368697665725424746f7012000186a0a307080f55246e756c6cd3090a0b0c0d0e554e535247425c4e53436f6c6f7253706163655624636c6173734f1027', 'hex'),
			Buffer.from('0010018002d2101112135a24636c6173736e616d655824636c6173736573574e53436f6c6f72a21214584e534f626a6563745f100f4e534b657965644172636869766572d1171854726f6f74800108111a232d32373b41484e5b628c8e9095a0a9b1b4bdcfd2d700000000000001010000000000000019000000000000000000000000000000d9', 'hex')
		]

		terminalAppTemplate = termcolors.export(
			readFileSync(resolve(__dirname, 'templates/One Dark.terminal')),
			// From termcolors/lib/formats/terminal-app.js
			_.partialRight(_.mapValues, function (color) {
				var srgb = color.toAvgRgbArray()
				srgb = srgb.map(function (n) {
					return n.toFixed(10).toString()
				}).join(' ')
				var output = code[0].toString('binary') + srgb + code[1].toString('binary')
				output = (Buffer.from(output, 'binary')).toString('base64')
				return output.match(/.{1,68}/g).join('\n\t')
			})
		)

	} catch (e) {
		handleError('Error compiling terminal color template', e)
	}

	try {
		writeFileSync(resolve(__dirname, '../term/One Dark.itermcolors'), itermTemplate(terminalPalette))
		writeFileSync(resolve(__dirname, '../term/One Dark.terminal'), terminalAppTemplate(terminalPalette))
		writeFileSync(resolve(__dirname, '../term/One Dark.alacritty'), alacrittyTemplate(terminalPalette))
	} catch (e) {
		handleError('Error writing terminal color file', e)
	}

} catch (e) {
	handleError('Error reading Xresources terminal color file', e)
}

console.log('Success!')
