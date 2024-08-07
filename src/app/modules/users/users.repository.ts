import _ from 'lodash';
// import {
//   AnyRecord,
//   ModelStructure,
//   ModelTypes,
//   ModelScalarFields,
//   MODELS_NAME,
// } from '../core/repository/prisma-repo';
import BaseRepository from 'src/core/repository/baseRepository';
import {
  MODELS_NAME,
  ModelScalarFields,
  ModelStructure,
  ModelTypes,
} from 'src/core/repository/prisma-repo';

// This type will be used if you want to extends the functions in users Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.USERS]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.USERS]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.USERS]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.USERS]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.USERS]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.USERS]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.USERS]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.USERS]['Delegate'];
type GroupBy = ModelTypes[typeof MODELS_NAME.USERS]['GroupBy'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.USERS>;
type Model = ModelStructure[typeof MODELS_NAME.USERS];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class UsersRepository extends BaseRepository(MODELS_NAME.USERS) {}

export default UsersRepository;
