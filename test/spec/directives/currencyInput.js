'use strict';

describe('Directive: currencyInput', function () {
    beforeEach(module('UBSAngularApp'));
    var element, $compile, scope, modelValue, modelCtrl;

    beforeEach(inject(function ($injector) {
        scope = $injector.get('$rootScope').$new();
        $compile = $injector.get('$compile');

        modelValue = scope.model = {};
        element = angular.element('<form name="currencyForm"><input name="amount" currency-input ng-model="model.amount"/></form>');
        element = $compile(element)(scope);
        modelCtrl = scope.currencyForm.amount;


    }));

    it('initial value of element should be empty', function () {
        expect(element.text()).toBe('');
    });

    it('initial value of element should be empty', function () {
        modelCtrl.$setViewValue('100');
        expect(modelValue.amount).toBe(100);
    });

    it('should be able to convert shortcuts correctly', function(){
      expect(modelCtrl.handleShortCuts('1m')).toBe('1000000');
      expect(modelCtrl.handleShortCuts('1k')).toBe('1000');
      expect(modelCtrl.handleShortCuts('1b')).toBe('1000000000');
      expect(modelCtrl.handleShortCuts('k')).toBe('000');
      expect(modelCtrl.handleShortCuts('100')).toBe('100');
      expect(modelCtrl.handleShortCuts('0')).toBe('0');
    })

    it('should be able to remove non-digits correctly', function(){
        expect(modelCtrl.removeNonDigits('1')).toBe('1');
        expect(modelCtrl.removeNonDigits('1.1')).toBe('1.1');
        expect(modelCtrl.removeNonDigits('0.1')).toBe('0.1');
        expect(modelCtrl.removeNonDigits('1,1')).toBe('11');
        expect(modelCtrl.removeNonDigits('1,1x')).toBe('11');
        expect(modelCtrl.removeNonDigits('a1,1x')).toBe('11');
    })

    it('should be able to parse currency value correctly', function(){
        expect(modelCtrl.parseCurrency('1m')).toBe(1);
        expect(modelCtrl.parseCurrency('1.100')).toBe(1.100);
        expect(modelCtrl.parseCurrency('1.1')).toBe(1.1);

    })

    it('should be able to parse view value correctly',function(){
        modelCtrl.$setViewValue('1k');
        expect(modelValue.amount).toBe(1000);

        modelCtrl.$setViewValue('1.1k');
        expect(modelValue.amount).toBe(1.1);

        modelCtrl.$setViewValue('1m');
        expect(modelValue.amount).toBe(1000000);

        modelCtrl.$setViewValue('1b');
        expect(modelValue.amount).toBe(1000000000);

        modelCtrl.$setViewValue('1');
        expect(modelValue.amount).toBe(1);

        modelCtrl.$setViewValue('10');
        expect(modelValue.amount).toBe(10);

        modelCtrl.$setViewValue('0');
        expect(modelValue.amount).toBe(0);

    })

    it('should be able to format view value correctly', function(){
        modelValue.amount =100000;
        scope.$digest();
        expect(modelCtrl.$viewValue).toBe('100,000');

        modelValue.amount =100000.001;
        scope.$digest();
        expect(modelCtrl.$viewValue).toBe('100,000.001');

    })

    it('simulate keyup and verify valid values ', function(){
      var input = element.find('input');
        input.val('1k');
        input.trigger('keyup');
        expect(modelCtrl.$modelValue).toBe(1000);
        expect(input.val()).toBe('1,000');
    })

});
