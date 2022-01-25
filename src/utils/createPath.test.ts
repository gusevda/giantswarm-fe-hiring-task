import createPath from './createPath';

it('returns template string without changes when parameters are not provided', () => {
  expect(createPath('/users')).toEqual('/users');
  expect(createPath('/users/:id')).toEqual('/users/:id');
});

it('replaces parameters in template string with correct values', () => {
  expect(createPath('/users/:id', { id: 1 })).toEqual('/users/1');
  expect(createPath('/apps/:slug', { id: 3 })).toEqual('/apps/:slug');
  expect(createPath('/apps/:slug', { id: 3, slug: 'app-1' })).toEqual(
    '/apps/app-1'
  );
  expect(
    createPath('/users/:id/subscriptions/:subscriptionId', {
      id: 2,
      subscriptionId: 'subscr-1234',
    })
  ).toEqual('/users/2/subscriptions/subscr-1234');
});
