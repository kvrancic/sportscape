import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
  rem,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export function StatsRing({ data }) {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label} className="transform hover:-translate-y-1 hover:shadow-xl transition duration-300 shadow-lg">
        <Group className="group-hover:font-black hover:shadow-orange-500">
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              </Center>
            }
          />

          <div className="group-hover:font-black hover:shadow-orange-500">
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <div className="font-bold text-xl ">
              {stat.stats}
            </div>
          </div>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>;
}
