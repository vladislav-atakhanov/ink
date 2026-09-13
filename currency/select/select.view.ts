namespace $.$$ {
	export class $ink_currency_select extends $.$ink_currency_select {
		override title() {
			switch (this.type()) {
				case 'input':
					return this.input_title()
				case 'output':
					return this.output_title()
			}
			return super.title()
		}
		@$mol_mem
		override filtered() {
			return this.$.$ink_currency
				.list()
				.filter(this.$.$mol_match_text(this.filter(), id => [id, this.item_name(id), this.item_symbol(id)]))
				.map(id => this.Item(id))
		}
		override item_name(id: string) {
			return this.$.$ink_currency.currency_name(id)
		}
		override item_symbol(id: string) {
			return this.$.$ink_currency.currency_symbol(id)
		}

		@$mol_mem_key
		override item_arg(id: string) {
			const type = this.type()
			if (!type) return {}
			return {
				type: null,
				[type]: id,
			}
		}
	}
}
