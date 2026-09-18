namespace $ {
	export class $ink_calculator extends $mol_object {
		private state = {
			accumulator: 0,
			operator: '',
			clearOnNext: true,
		}

		@$mol_mem
		input(next?: string) {
			return next || '0'
		}
		digit(d: string) {
			const { state } = this
			this.input(state.clearOnNext ? d : this.input() + d.toString())
			state.clearOnNext = false
		}
		decimal() {
			const { state } = this
			if (state.clearOnNext) {
				this.input('0.')
				state.clearOnNext = false
				return
			}
			if (this.input().includes('.')) return
			this.input((this.input() || '0') + '.')
		}

		private operator(op: '+' | '-' | '*' | '/') {
			const { state } = this
			if (!state.clearOnNext) {
				this.equal()
				state.accumulator = parseFloat(this.input()) || 0
			}
			state.operator = op
			state.clearOnNext = true
		}

		add() {
			this.operator('+')
		}

		subtract() {
			this.operator('-')
		}

		multiply() {
			this.operator('*')
		}

		divide() {
			this.operator('/')
		}

		equal() {
			const { state } = this
			if (!state.operator) return

			const left = state.accumulator
			const right = parseFloat(this.input()) || 0
			let result: number

			switch (state.operator) {
				case '+':
					result = left + right
					break
				case '-':
					result = left - right
					break
				case '*':
					result = left * right
					break
				case '/':
					result = right !== 0 ? left / right : 0
					break
				default:
					return
			}

			this.input(String(result))
			state.accumulator = result
			state.operator = ''
			state.clearOnNext = true
		}

		clear() {
			const { state } = this
			this.input('0')
			state.accumulator = 0
			state.operator = ''
			state.clearOnNext = true
		}

		delete() {
			const val = this.input().slice(0, -1)
			this.input(val || '0')
		}

		percent() {
			const val = parseFloat(this.input()) || 0
			this.input(String(val / 100))
			this.equal()
		}
	}
}
