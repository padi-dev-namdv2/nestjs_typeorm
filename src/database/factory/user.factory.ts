import { User } from "../../module/users/entities/user.entity"
import Faker from 'faker'
import { factory, define } from "typeorm-seeding";

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.email.string(30);
  const guard = 'aricle';
  const user = new User();
  user.name = `${firstName} ${lastName}`
  user.email = email;
  user.guard = guard;
  user.password = faker.random.word()
  return user
})