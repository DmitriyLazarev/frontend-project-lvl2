const getJsonFormatMockData = () => '[{"actionType":"compareChildren","key":"common","value":[{"actionType":"added","key":"follow","value":false},{"actionType":"equal","key":"setting1","value":"Value 1"},{"actionType":"removed","key":"setting2","value":200},{"actionType":"updated","key":"setting3","removedValue":true,"value":null},{"actionType":"added","key":"setting4","value":"blah blah"},{"actionType":"added","key":"setting5","value":{"key5":"value5"}},{"actionType":"compareChildren","key":"setting6","value":[{"actionType":"compareChildren","key":"doge","value":[{"actionType":"updated","key":"wow","removedValue":"","value":"so much"}]},{"actionType":"equal","key":"key","value":"value"},{"actionType":"added","key":"ops","value":"vops"}]}]},{"actionType":"compareChildren","key":"group1","value":[{"actionType":"updated","key":"baz","removedValue":"bas","value":"bars"},{"actionType":"equal","key":"foo","value":"bar"},{"actionType":"updated","key":"nest","removedValue":{"key":"value"},"value":"str"}]},{"actionType":"removed","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"actionType":"added","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

export default getJsonFormatMockData;