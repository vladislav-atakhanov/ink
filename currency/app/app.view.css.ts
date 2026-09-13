namespace $ {
	$mol_style_define($ink_currency_app, {
		Menu: {
			flex: { basis: '18rem', grow: 0 },
		},
		Keyboard: {
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			$mol_button: {
				justifyContent: 'center',
				border: { radius: 0 },
				background: { color: $mol_theme.back },
				color: $mol_theme.text,
				font: { size: '2rem' },
				padding: 0,
			},
			$mol_icon: {
				filter: 'none',
			},
			flex: { grow: 5 },
			maxHeight: '75vh',
		},
		Github_icon: {
			alignSelf: 'center',
			color: $mol_theme.text,
		},
		Info_row: {
			'>': {
				$mol_view: {
					flex: { grow: 1 },
					justifyContent: 'center',
				},
			},
		},
		Default: {
			flex: { basis: '40rem', shrink: 0, grow: 1 },
			Body_content: { padding: 0, height: '100%' },
			Body: {
				border: {
					left: { color: $mol_theme.line, width: '1px', style: 'solid' },
					right: { color: $mol_theme.line, width: '1px', style: 'solid' },
				},
			},
		},
		List: {
			flex: { grow: 0, basis: '40rem', shrink: 0 },
		},
		Input: {
			Value: {
				color: $mol_theme.control,
			},
		},
		Output: {
			Value: {
				color: $mol_theme.current,
			},
			border: {
				top: { width: '1px', style: 'solid', color: $mol_theme.line },
				bottom: { width: '1px', style: 'solid', color: $mol_theme.line },
			},
		},
		Lang: {
			flex: { grow: 1 },
			Trigger: { justifyContent: 'space-between' },
		},
		Preset_name: {
			flex: { grow: 1 },
		},
		Digit: {
			background: { color: $mol_theme.card },
		},
		Preset_to: {
			color: $mol_theme.shade,
		},
		...Object.fromEntries(
			['Add', 'Subtract', 'Multiply', 'Divide', 'Equal'].map(key => [
				key,
				{
					backgroundColor: `hsl(${$mol_theme.hue} 50% 30%)`,
					color: 'white',
					':hover': {
						boxShadow: 'none',
						backgroundColor: `hsl(${$mol_theme.hue} 50% 20%)`,
					},
				},
			]),
		),
		Equal: {
			'--hue': `calc(${$mol_theme.hue} - ${$mol_theme.hue_spread})`,
			backgroundColor: `hsl(var(--hue) 50% 30%)`,
			color: 'white',
			':hover': {
				boxShadow: 'none',
				backgroundColor: `hsl(var(--hue) 50% 20%)`,
			},
		},
	})
	$mol_style_define($ink_currency_string, {
		background: { color: $mol_theme.field },
		flex: { grow: 1 },
		padding: ['1rem', $mol_gap.block],
		border: { radius: 0 },
		justifyContent: 'space-between',
		alignItems: 'center',
		color: $mol_theme.text,
		Text: {
			font: { size: '2rem' },
			lineHeight: '1',
			gap: $mol_gap.space,
		},
		Symbol: { color: $mol_theme.shade },
	})
}
