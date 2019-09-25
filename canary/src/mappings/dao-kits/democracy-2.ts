import { crypto } from '@graphprotocol/graph-ts'

import {
  DeployInstance,
  NewInstanceCall,
  NewTokenAndInstanceCall,
} from '../../../generated/DAO/kits/democracy-2/DemocracyKit'

import { Dao, DaoTemplateInstance } from '../../../generated/schema'

import * as bytes from '../../helpers/bytes'

export function handleDeployInstance(event: DeployInstance): void {
  let dao = new Dao(event.params.dao.toHex())
  dao.template = 'DEMOCRACY'
  dao.token = event.params.token

  dao.save()
}

export function handleNewInstance(call: NewInstanceCall): void {
  let name = bytes.fromString(call.inputs.aragonId)

  let instance = new DaoTemplateInstance(crypto.keccak256(name).toHexString())
  instance.name = call.inputs.aragonId
  instance.template = 'DEMOCRACY'
  instance.templateAddress = call.to

  instance.created = call.block.timestamp
  instance.createdAtBlock = call.block.number
  instance.createdAtTransaction = call.transaction.hash

  instance.save()
}

export function handleNewTokenAndInstance(call: NewTokenAndInstanceCall): void {
  let name = bytes.fromString(call.inputs.aragonId)

  let instance = new DaoTemplateInstance(crypto.keccak256(name).toHexString())
  instance.name = call.inputs.aragonId
  instance.template = 'DEMOCRACY'
  instance.templateAddress = call.to

  instance.created = call.block.timestamp
  instance.createdAtBlock = call.block.number
  instance.createdAtTransaction = call.transaction.hash

  instance.save()
}
