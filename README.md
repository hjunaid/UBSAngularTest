1- Git pull UBSAngularTest repository on your desktop

2- Run npm install

3- Run bower install

4- Run grunt server to launch test page which contains input with currency-input directive

5- Additionally run grunt karma to run through unit tests


******************************
Solution
******************************

 - I choose Angular for this task as Angular provides features to encapsulate, reuse and test components easily

   - I wrote a CurrencyInput directive that works along with ng-model directive to transform user input into the desired result

   - Solution works using parsers and formatters from ngModelController

   - Angular form component could be used along side ng-model to provide feedback to the user

   - Karma tests were written to validate correct behaviour of the component



