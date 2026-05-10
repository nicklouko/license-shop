import prisma from '../src/lib/prisma';

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Starter License',
        description:
          'Perfect for individuals just getting started. Includes core features and email support.',
        price: 990,
      },
      {
        name: 'Basic License',
        description: 'Great for personal projects and small teams. Includes all core features.',
        price: 2900,
      },
      {
        name: 'Pro License',
        description:
          'Full access for professionals. Includes advanced features, priority support and free updates.',
        price: 9900,
      },
      {
        name: 'Team License',
        description:
          'Designed for growing teams of up to 10 members. Includes collaborative features and shared workspaces.',
        price: 19900,
      },
      {
        name: 'Enterprise License',
        description:
          'Full access for large organizations with dedicated support, SLA guarantee and custom integrations.',
        price: 49900,
      },
    ],
  });
  console.log('Seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
