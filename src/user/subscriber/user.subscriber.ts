import { verify, hash } from 'argon2'
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { User }  from '../entity/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    beforeInsert(event: InsertEvent<User>): Promise<void> {
        return this.hashPassword(event.entity);
    }

    async hashPassword(entity: User): Promise<void> {
        if (entity.password) entity.password = await hash(entity.password)
    }

    listenTo() {
        return User;
    }
}