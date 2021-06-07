import { EntityRepository, Repository } from 'typeorm';
import { Monitor } from './monitor.entity';

@EntityRepository(Monitor)
export class MonitorRepository extends Repository<Monitor> {
  async createOrUpdateMonitor(
    purchase,
    sell,
    interval,
    change
  ) {
    let monitor = await Monitor.findOne({ pair: `${purchase}-${sell}` })

    if (!monitor) {
      monitor = new Monitor()
    }

    monitor.pair = `${purchase}-${sell}`
    monitor.interval = interval
    monitor.change = change

    await monitor.save();
  }
}