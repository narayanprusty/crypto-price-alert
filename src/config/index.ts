import { BigNumber } from 'bignumber.js';

BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSize: 0,
    groupSeparator: '',
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0,
  },
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: 1e9,
});

export default (): any => ({
  uphold: {
    baseURL: process.env.UPHOLD_BASE_URL || 'https://api-sandbox.uphold.com'
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    synchronize: true
  },
})
