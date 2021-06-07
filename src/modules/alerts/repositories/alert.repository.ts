import { EntityRepository, Repository } from 'typeorm';
import { Alert } from '../entities/alert.entity';
import * as moment from 'moment';

@EntityRepository(Alert)
export class AlertRepository extends Repository<Alert> {
  async createAlert(
    rate: string,
    pair: string,
    change: number
  ) {
    const alert = new Alert()
      
    alert.createdAt = moment()
    .utc()
    .toDate();

    alert.pair = pair
    alert.change = change
    alert.rate = rate

    await alert.save()
  }
}