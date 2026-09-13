namespace $ {
	type Currency = string

	export class $ink_currency_class extends $mol_object {
		get cacheKey() {
			return this.key('btc')
		}

		key(id: string) {
			return `$ink_currency.${id}`
		}

		@$mol_mem
		private version(next?: number): number {
			return next ?? 0
		}

		refresh() {
			this.$.$mol_state_local.value(this.cacheKey, null)
			this.version(this.version() + 1)
			this.auto()
		}

		auto() {
			this.content()
		}

		@$mol_mem
		content() {
			this.version()

			const cached = this.$.$mol_state_local.value(this.cacheKey) as {
				date: string
				btc: Record<Currency, number>
				fetchedAt: number
			} | null
			if (cached && Date.now() - cached.fetchedAt < 12 * 60 * 60 * 1000) return cached

			const data = this.$.$mol_fetch.json(`https://latest.currency-api.pages.dev/v1/currencies/btc.min.json`) as {
				date: string
				btc: Record<Currency, number>
			}

			this.$.$mol_state_local.value(this.cacheKey, { ...data, fetchedAt: Date.now() })

			return data
		}

		@$mol_mem
		list() {
			const { btc } = this.content()
			const currencies = Object.keys(btc)
			currencies.sort()
			return currencies
		}

		@$mol_mem_key
		currency(id: Currency) {
			return this.content().btc[id]
		}

		@$mol_mem_key
		value([from, to, value]: [Currency, Currency, number]) {
			if (value === 0) return 0
			const f = this.currency(from)
			const t = this.currency(to)
			return (t / f) * value
		}

		@$mol_mem
		value_formatter() {
			let lang = this.$.$mol_locale.lang()
			if (lang === 'kk') lang = 'ru'
			const intl = new Intl.NumberFormat(lang, {
				style: 'decimal',
				maximumFractionDigits: 2,
				minimumFractionDigits: 2,
			})
			return intl.format
		}

		@$mol_mem
		currency_name_formatter() {
			const intl = new Intl.DisplayNames(this.$.$mol_locale.lang(), {
				type: 'currency',
				style: 'long',
				fallback: 'none',
			})
			return intl.of.bind(intl)
		}

		@$mol_mem_key
		currency_name(id: Currency) {
			try {
				const name = this.currency_name_formatter()(id)
				if (!name) return id.toUpperCase()
				return this.$.$ink_case_capital(name)
			} catch (e) {
				return id.toUpperCase()
			}
		}

		@$mol_mem_key
		currency_symbol_formatter(id: Currency) {
			const formatter = new Intl.NumberFormat(this.$.$mol_locale.lang(), {
				style: 'currency',
				currency: id,
				currencyDisplay: 'symbol',
			})
			const parts = formatter.formatToParts(0)
			const currencyPart = parts.find(part => part.type === 'currency')
			return currencyPart ? currencyPart.value : id.toUpperCase()
		}

		@$mol_mem_key
		currency_symbol(id: Currency) {
			const currency = (this.$.$ink_currency_list as Record<Currency, { symbol: string }>)[id]
			if (currency) return currency.symbol
			try {
				return this.currency_symbol_formatter(id)
			} catch (e) {
				return id.toUpperCase()
			}
		}

		@$mol_mem
		last_update() {
			const fetched = this.$.$mol_state_local.value<{ fetchedAt: number }>(this.cacheKey)?.fetchedAt
			return new this.$.$mol_time_moment(fetched ?? Date.now())
		}
	}

	export const $ink_currency = new $ink_currency_class()
	export function $ink_case_capital(str = '') {
		const [first, ...rest] = [...str]
		return first ? first.toUpperCase() + rest.join('') : ''
	}
}
