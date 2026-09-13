namespace $.$$ {
	$mol_test({
		'digit appends to empty input'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('5')
			$mol_assert_equal(app.input(), '5')
		},

		'digit appends to existing input'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('3')
			app.digit('7')
			$mol_assert_equal(app.input(), '37')
		},

		'digit replaces input after operator'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('1')
			app.add()
			app.digit('2')
			$mol_assert_equal(app.input(), '2')
		},

		'decimal adds dot'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('3')
			app.decimal()
			app.digit('5')
			$mol_assert_equal(app.input(), '3.5')
		},

		'decimal prevents multiple dots'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('2')
			app.decimal()
			app.decimal()
			$mol_assert_equal(app.input(), '2.')
		},

		'decimal starts with 0.'($) {
			const app = $ink_calculator.make({ $ })
			app.decimal()
			$mol_assert_equal(app.input(), '0.')
		},

		'decimal starts with 0. after operator'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('5')
			app.add()
			app.decimal()
			app.digit('2')
			$mol_assert_equal(app.input(), '0.2')
		},

		'operator clears input for next number'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('4')
			app.digit('2')
			app.add()
			app.digit('7')
			$mol_assert_equal(app.input(), '7')
		},

		'pressing second operator replaces it'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('5')
			app.add()
			app.multiply()
			app.digit('3')
			app.equal()
			$mol_assert_equal(app.input(), '15')
		},

		'equal performs addition'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('1')
			app.digit('0')
			app.add()
			app.digit('2')
			app.digit('0')
			app.equal()
			$mol_assert_equal(app.input(), '30')
		},

		'equal performs subtraction'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('5')
			app.digit('0')
			app.subtract()
			app.digit('2')
			app.digit('0')
			app.equal()
			$mol_assert_equal(app.input(), '30')
		},

		'equal performs multiplication'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('6')
			app.multiply()
			app.digit('7')
			app.equal()
			$mol_assert_equal(app.input(), '42')
		},

		'equal performs division'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('1')
			app.digit('0')
			app.digit('0')
			app.divide()
			app.digit('4')
			app.equal()
			$mol_assert_equal(app.input(), '25')
		},

		'equal divides by zero returns 0'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('5')
			app.divide()
			app.digit('0')
			app.equal()
			$mol_assert_equal(app.input(), '0')
		},

		'equal with no operator leaves input unchanged'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('7')
			app.equal()
			$mol_assert_equal(app.input(), '7')
		},

		'equal clears operator for fresh start'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('2')
			app.add()
			app.digit('3')
			app.equal()
			app.digit('5')
			$mol_assert_equal(app.input(), '5')
		},

		'clear resets input to 0'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('1')
			app.add()
			app.digit('2')
			app.equal()
			app.clear()
			$mol_assert_equal(app.input(), '0')
		},

		'clear then digit replaces 0'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('2')
			app.add()
			app.digit('3')
			app.equal()
			app.clear()
			app.digit('9')
			$mol_assert_equal(app.input(), '9')
		},

		'delete removes last character'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('1')
			app.digit('2')
			app.digit('3')
			app.delete()
			$mol_assert_equal(app.input(), '12')
		},

		'delete on single digit returns to 0'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('9')
			app.delete()
			$mol_assert_equal(app.input(), '0')
		},

		'delete on initial 0 stays 0'($) {
			const app = $ink_calculator.make({ $ })
			app.delete()
			$mol_assert_equal(app.input(), '0')
		},

		'percent divides by 100'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('5')
			app.digit('0')
			app.percent()
			$mol_assert_equal(app.input(), '0.5')
		},

		'percent on empty input returns 0'($) {
			const app = $ink_calculator.make({ $ })
			app.percent()
			$mol_assert_equal(app.input(), '0')
		},

		'chain 1 + 2 - 1 = 2'($) {
			const app = $ink_calculator.make({ $ })
			app.digit('1')
			app.add()
			app.digit('2')
			app.equal()
			app.subtract()
			app.digit('1')
			app.equal()
			$mol_assert_equal(app.input(), '2')
		},
	})
}
