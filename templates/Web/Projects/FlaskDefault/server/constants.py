# Copyright (c) Microsoft Corporation.
# Licensed under the MIT license.

import os

CONSTANTS = {
    'PORT': os.environ.get('PORT', 3001),
    'HTTP_STATUS': {
        '404_NOT_FOUND': 404,
    },
}
