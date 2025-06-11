import {expect, test} from 'vitest'
import { sortPages } from './report'

const newPage :Record<string,number> = {
    'https://www.jonathan.strickland1':1,
    'https://www.jonathan.strickland2':10,
    'https://www.jonathan.strickland3':3,
    'https://www.jonathan.strickland4':5,
}


test('get full URL from relative URL',() => {
    expect(sortPages(newPage)).toStrictEqual({'https://www.jonathan.strickland2':10,'https://www.jonathan.strickland4':5,'https://www.jonathan.strickland3':3,'https://www.jonathan.strickland1':1})
})