import os

CONSTANTS = {
    'PORT': os.environ.get('PORT', 3001),
    'ENDPOINT': {
        'MASTERDETAIL': '/api/masterdetail',
        'LIST': '/api/list',
        'GRID': '/api/grid',
    }
}
