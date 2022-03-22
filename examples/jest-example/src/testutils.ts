// testutils.ts
import * as enzyme from 'enzyme'
import {wrap} from '@kaminrunde/firescout-enzyme'

export default wrap(enzyme)


// in test
import {shallow} from './testutils'

const el = shallow(<App/>)

el.context('foo').handle('my-handle').shouldHaveState('foo')