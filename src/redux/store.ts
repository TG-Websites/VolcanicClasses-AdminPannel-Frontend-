import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import courseReducer from './slices/course'
import admissionReducer from './slices/admission'
import cloudinaryReducer from './slices/cloudinary'
import classReducer from './slices/liveClass'
import mediaReducer from './slices/media'
import announcementReducer from './slices/announcement'
import userReducer from './slices/users'
import adminDashboardReducer from './slices/dashboard'
import orderReducer from './slices/order'
import paymentReducer from './slices/payment'
import studentDashboardReducer from './slices/studentDashboard'


export const store = configureStore({
  reducer: {
    auth : authReducer,
    course :courseReducer,
    admission:admissionReducer,
    cloudinary:cloudinaryReducer,
    class:classReducer,
    media :mediaReducer,
    announcement : announcementReducer,
    user:userReducer,
    adminDashboard : adminDashboardReducer,
    order : orderReducer,
    payment : paymentReducer,
    studentDashboard : studentDashboardReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch