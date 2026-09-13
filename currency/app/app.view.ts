namespace $.$$ {
	export class $ink_currency_app extends $.$ink_currency_app {
		@$mol_mem
		override online(next?: boolean) {
			return this.$.$mol_dom.navigator.onLine
		}

		override currency(id: 'input' | 'output', next?: string): string {
			const key = this.$.$ink_currency.key(id)
			const v = this.$.$mol_state_arg.value(id, next)
			if (v) return this.$.$mol_state_local.value(key, v)!
			const value = this.$.$mol_state_local.value(key, next)
			if (value) return this.$.$mol_state_arg.value(id, value)!
			if (id === 'input') return this.$.$mol_state_arg.value(id, 'rub')!
			return this.$.$mol_state_arg.value(id, 'usd')!
		}
		override digit_title(id: string) {
			return id
		}

		@$mol_action
		override refresh() {
			return this.$.$ink_currency.refresh()
		}
		signal = new AbortController()
		override auto() {
			this.$.$mol_dom.addEventListener('offline', () => this.online(false), { signal: this.signal.signal })
			this.$.$mol_dom.addEventListener('online', () => this.online(true), { signal: this.signal.signal })
			this.$.$ink_currency.auto()
		}
		override destructor() {
			super.destructor()
			this.signal.abort()
		}

		override refresh_title() {
			return this.$.$ink_currency.last_update().toString('hh:mm')
		}

		@$mol_action
		override revert() {
			const tmp = this.currency('input')
			this.currency('input', this.currency('output'))
			this.currency('output', tmp)
		}
		override output() {
			const input = parseFloat(this.input())
			if (!input) return '0'
			return this.$.$ink_currency.value([this.currency('input'), this.currency('output'), input]).toString()
		}

		override type(next?: 'input' | 'output' | null) {
			return this.$.$mol_state_arg.value('type', next) || null
		}
		override list_auto() {
			this.dom_node().addEventListener('scrollend', () => this.type() && this.List().Filter().bring())
			return this.$.$ink_currency_select.prototype.auto.call(this.List())
		}
		presets(next?: string[]) {
			return this.$.$mol_state_local.value('presets', next ? [...new Set(next)] : undefined) ?? ([] as string[])
		}
		@$mol_mem_key
		override preset_input(id: string) {
			return this.item_symbol(id.split(' ')[0])
		}
		@$mol_mem_key
		override preset_output(id: string) {
			return this.item_symbol(id.split(' ')[1])
		}
		item_symbol(id: string) {
			return super.List().item_symbol(id)
		}
		@$mol_mem_key
		override preset_arg(id: string) {
			const [input, output] = id.split(' ')
			return { input, output }
		}
		@$mol_mem
		override presets_rows() {
			return this.presets().map(p => this.Preset(p))
		}
		@$mol_mem
		current_preset() {
			return `${this.currency('input')} ${this.currency('output')}`
		}
		@$mol_action
		override preset_save() {
			this.presets([...this.presets(), this.current_preset()])
		}
		@$mol_mem
		override lang_dictionary() {
			return Object.fromEntries(Object.keys(super.lang_dictionary()).map(k => [k, this.lang_formatter(k)])) as any
		}
		@$mol_mem_key
		lang_formatter(id: string) {
			const intl = new Intl.DisplayNames(id, {
				type: 'language',
				style: 'long',
			})
			return this.$.$ink_case_capital(intl.of(id) || id)
		}

		override List() {
			return this.type() ? super.List() : (null as any)
		}
		override Preset_save() {
			return this.presets().includes(this.current_preset()) ? (null as any) : super.Preset_save()
		}
		@$mol_action
		override preset_remove(id: string) {
			this.presets(this.presets().filter(i => i !== id))
		}
	}
	export class $ink_currency_string extends $.$ink_currency_string {
		text() {
			return this.$.$ink_currency.value_formatter()(parseFloat(this.value()))
		}
		currency_text() {
			return this.currency().toUpperCase()
		}
		symbol() {
			return this.$.$ink_currency.currency_symbol(this.currency())
		}
	}
}
