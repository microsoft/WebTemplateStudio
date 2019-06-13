import os

CONSTANTS = {}

//{[{
CONSTANTS['ENDPOINT'] = {}
//}]}
//{[{
CONSTANTS['ENDPOINT']['GRID'] = '/api/grid'
//}]}

CONSTANTS['PORT'] = os.environ.get('PORT', 3001)