import { createStore, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(reduxThunk),
            applyMiddleware(createLogger())
        )
    )
}
