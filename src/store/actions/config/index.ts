import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import serviceController, { routes, routeFilter } from 'controller'
import { isPendingAction, isFulfilledAction, isRejectedAction } from '../typehandle.action'
import Icon from 'asset/icon/luxura'