import os

CONSTANTS = {}

//{[{
CONSTANTS['ENDPOINT'] = {}
//}]}

//{[{
CONSTANTS['ENDPOINT']['MASTERDETAIL'] = '/api/masterdetail'
//}]}

CONSTANTS['PORT'] = os.environ.get('PORT', 3001)