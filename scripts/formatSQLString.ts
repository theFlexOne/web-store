import fs from 'fs';
const sqlString = `
-- Product 1
SELECT fn_create_product(
  'FishMaster Classic Lure',
  'A classic fishing lure for all types of fish.',
  'classic_lure_thumbnail.jpg',
  'FishMaster',
  ARRAY['Lures', 'Fishing'],
  ARRAY['classic', 'all-purpose']
);

-- Product 2
SELECT fn_create_product(
  'AnglerPro Fishing Rod',
  'Carbon fiber fishing rod for freshwater fishing.',
  'fishing_rod_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Rods', 'Fishing'],
  ARRAY['carbon-fiber', 'freshwater']
);

-- Product 3
SELECT fn_create_product(
  'FishMaster Tackle Box',
  'Waterproof tackle box with multiple compartments.',
  'tackle_box_thumbnail.jpg',
  'FishMaster',
  ARRAY['Storage', 'Fishing'],
  ARRAY['waterproof', 'compartments']
);

-- Product 4
SELECT fn_create_product(
  'TechFish Fish Finder',
  'Advanced fish finder with GPS.',
  'fish_finder_thumbnail.jpg',
  'TechFish',
  ARRAY['Electronics', 'Fishing'],
  ARRAY['GPS', 'advanced']
);

-- Product 5
SELECT fn_create_product(
  'AnglerWear Fishing Hat',
  'Wide-brimmed hat for sun protection.',
  'fishing_hat_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['wide-brim', 'sun-protection']
);

-- Product 6
SELECT fn_create_product(
  'FishMaster Pro Reel',
  'High-performance fishing reel for saltwater fishing.',
  'fishing_reel_thumbnail.jpg',
  'FishMaster',
  ARRAY['Reels', 'Fishing'],
  ARRAY['saltwater', 'high-performance']
);

-- Product 7
SELECT fn_create_product(
  'AnglerPro Waders',
  'Durable waders for fly fishing.',
  'fishing_waders_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['fly-fishing', 'durable']
);

-- Product 8
SELECT fn_create_product(
  'TechFish Fishing Drone',
  'Remote-controlled drone for casting and baiting.',
  'fishing_drone_thumbnail.jpg',
  'TechFish',
  ARRAY['Electronics', 'Fishing'],
  ARRAY['drone', 'remote-controlled']
);

-- Product 9
SELECT fn_create_product(
  'FishMaster Baitcaster Rod',
  'Flexible baitcasting rod for precision casting.',
  'baitcasting_rod_thumbnail.jpg',
  'FishMaster',
  ARRAY['Rods', 'Fishing'],
  ARRAY['baitcasting', 'precision']
);

-- Product 10
SELECT fn_create_product(
  'AnglerWear Fishing Gloves',
  'Waterproof gloves with grip for handling fish.',
  'fishing_gloves_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['waterproof', 'grip']
);

-- Product 11
SELECT fn_create_product(
  'FishMaster Trolling Lure',
  'Large trolling lure for deep sea fishing.',
  'trolling_lure_thumbnail.jpg',
  'FishMaster',
  ARRAY['Lures', 'Fishing'],
  ARRAY['trolling', 'deep-sea']
);

-- Product 12
SELECT fn_create_product(
  'AnglerPro Fly Reel',
  'Lightweight fly reel for freshwater fly fishing.',
  'fly_reel_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Reels', 'Fishing'],
  ARRAY['fly-fishing', 'lightweight']
);

-- Product 13
SELECT fn_create_product(
  'TechFish Underwater Camera',
  'Waterproof camera for capturing underwater footage.',
  'underwater_camera_thumbnail.jpg',
  'TechFish',
  ARRAY['Electronics', 'Fishing'],
  ARRAY['waterproof', 'underwater']
);

-- Product 14
SELECT fn_create_product(
  'FishMaster Fillet Knife',
  'Sharp fillet knife for cleaning and preparing fish.',
  'fillet_knife_thumbnail.jpg',
  'FishMaster',
  ARRAY['Tools', 'Fishing'],
  ARRAY['fillet', 'sharp']
);

-- Product 15
SELECT fn_create_product(
  'AnglerWear Fishing Vest',
  'Lightweight and breathable vest for storing fishing gear.',
  'fishing_vest_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['lightweight', 'breathable']
);

-- Product 16
SELECT fn_create_product(
  'FishMaster Spinning Reel',
  'Versatile spinning reel for freshwater and saltwater fishing.',
  'spinning_reel_thumbnail.jpg',
  'FishMaster',
  ARRAY['Reels', 'Fishing'],
  ARRAY['spinning', 'versatile']
);

-- Product 17
SELECT fn_create_product(
  'AnglerPro Polarized Sunglasses',
  'Polarized sunglasses for reducing glare while fishing.',
  'fishing_sunglasses_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Accessories', 'Fishing'],
  ARRAY['polarized', 'glare-reducing']
);

-- Product 18
SELECT fn_create_product(
  'TechFish Solar Charger',
  'Portable solar charger for charging electronic devices while fishing.',
  'solar_charger_thumbnail.jpg',
  'TechFish',
  ARRAY['Electronics', 'Fishing'],
  ARRAY['portable', 'solar-powered']
);

-- Product 19
SELECT fn_create_product(
  'FishMaster Trolling Motor',
  'Electric trolling motor for maneuvering a boat while fishing.',
  'trolling_motor_thumbnail.jpg',
  'FishMaster',
  ARRAY['Accessories', 'Fishing'],
  ARRAY['electric', 'trolling']
);

-- Product 20
SELECT fn_create_product(
  'AnglerWear Fishing Socks',
  'Moisture-wicking socks for keeping feet dry while fishing.',
  'fishing_socks_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['moisture-wicking', 'comfortable']
);

-- Product 21
SELECT fn_create_product(
  'FishMaster Fly Tying Kit',
  'Complete kit for tying flies for fly fishing.',
  'fly_tying_kit_thumbnail.jpg',
  'FishMaster',
  ARRAY['Tools', 'Fishing'],
  ARRAY['fly-tying', 'complete-kit']
);

-- Product 22
SELECT fn_create_product(
  'AnglerPro Kayak',
  'Lightweight and stable kayak for fishing in calm waters.',
  'fishing_kayak_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Watercraft', 'Fishing'],
  ARRAY['kayak', 'lightweight']
);

-- Product 23
SELECT fn_create_product(
  'TechFish Fish Scale',
  'Digital fish scale for accurately weighing catches.',
  'fish_scale_thumbnail.jpg',
  'TechFish',
  ARRAY['Tools', 'Fishing'],
  ARRAY['digital', 'accurate']
);

-- Product 24
SELECT fn_create_product(
  'FishMaster Bait Cooler',
  'Insulated cooler for keeping bait fresh while fishing.',
  'bait_cooler_thumbnail.jpg',
  'FishMaster',
  ARRAY['Storage', 'Fishing'],
  ARRAY['insulated', 'bait']
);

-- Product 25
SELECT fn_create_product(
  'AnglerWear Fishing Jacket',
  'Waterproof and windproof jacket for fishing in inclement weather.',
  'fishing_jacket_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['waterproof', 'windproof']
);

-- Product 26
SELECT fn_create_product(
  'FishMaster Cast Net',
  'Heavy-duty cast net for catching bait fish.',
  'cast_net_thumbnail.jpg',
  'FishMaster',
  ARRAY['Tools', 'Fishing'],
  ARRAY['heavy-duty', 'bait']
);

-- Product 27
SELECT fn_create_product(
  'AnglerPro Fishing Pliers',
  'Durable and rust-resistant pliers for removing hooks.',
  'fishing_pliers_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Tools', 'Fishing'],
  ARRAY['durable', 'rust-resistant']
);

-- Product 28
SELECT fn_create_product(
  'TechFish Marine GPS',
  'Waterproof and shockproof GPS for navigation while fishing.',
  'marine_gps_thumbnail.jpg',
  'TechFish',
  ARRAY['Electronics', 'Fishing'],
  ARRAY['waterproof', 'shockproof']
);

-- Product 29
SELECT fn_create_product(
  'FishMaster Tackle Bag',
  'Large and durable bag for storing fishing tackle.',
  'tackle_bag_thumbnail.jpg',
  'FishMaster',
  ARRAY['Storage', 'Fishing'],
  ARRAY['large', 'durable']
);

-- Product 30
SELECT fn_create_product(
  'AnglerWear Fishing Hoodie',
  'Comfortable and moisture-wicking hoodie for chilly days on the water.',
  'fishing_hoodie_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['moisture-wicking', 'comfortable']
);

-- Product 31
SELECT fn_create_product(
  'FishMaster Crab Trap',
  'Heavy-duty trap for catching crabs while fishing.',
  'crab_trap_thumbnail.jpg',
  'FishMaster',
  ARRAY['Tools', 'Fishing'],
  ARRAY['heavy-duty', 'crab']
);

-- Product 32
SELECT fn_create_product(
  'AnglerPro Fishing Net',
  'Rubber net for reducing damage to fish while landing.',
  'fishing_net_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Tools', 'Fishing'],
  ARRAY['rubber', 'fish-friendly']
);

-- Product 33
SELECT fn_create_product(
  'TechFish Portable Fish Finder',
  'Compact and portable fish finder for kayaks and small boats.',
  'portable_fish_finder_thumbnail.jpg',
  'TechFish',
  ARRAY['Electronics', 'Fishing'],
  ARRAY['compact', 'portable']
);

-- Product 34
SELECT fn_create_product(
  'FishMaster Trolling Rod',
  'Sturdy trolling rod for deep sea and offshore fishing.',
  'trolling_rod_thumbnail.jpg',
  'FishMaster',
  ARRAY['Rods', 'Fishing'],
  ARRAY['trolling', 'sturdy']
);

-- Product 35
SELECT fn_create_product(
  'AnglerWear Fishing Shoes',
  'Waterproof and slip-resistant shoes for fishing in wet areas.',
  'fishing_shoes_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['waterproof', 'slip-resistant']
);

-- Product 36
SELECT fn_create_product(
  'FishMaster Jigging Spoon',
  'Versatile jigging spoon for all types of fish.',
  'jigging_spoon_thumbnail.jpg',
  'FishMaster',
  ARRAY['Lures', 'Fishing'],
  ARRAY['versatile', 'all-purpose']
);

-- Product 37
SELECT fn_create_product(
  'AnglerPro Tackle Backpack',
  'Spacious and comfortable backpack for carrying fishing gear.',
  'tackle_backpack_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Storage', 'Fishing'],
  ARRAY['spacious', 'comfortable']
);

-- Product 38
SELECT fn_create_product(
  'TechFish Night Fishing Light',
  'Waterproof and battery-powered light for night fishing.',
  'night_fishing_light_thumbnail.jpg',
  'TechFish',
  ARRAY['Accessories', 'Fishing'],
  ARRAY['waterproof', 'battery-powered']
);

-- Product 39
SELECT fn_create_product(
  'FishMaster Baitcasting Reel',
  'Smooth and durable baitcasting reel for all types of fishing.',
  'baitcasting_reel_thumbnail.jpg',
  'FishMaster',
  ARRAY['Reels', 'Fishing'],
  ARRAY['baitcasting', 'smooth']
);

-- Product 40
SELECT fn_create_product(
  'AnglerWear Fishing Buff',
  'Versatile and multi-functional headwear for fishing.',
  'fishing_buff_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['versatile', 'multi-functional']
);

-- Product 41
SELECT fn_create_product(
  'FishMaster Terminal Tackle Kit',
  'Complete kit for all types of fishing rigs and setups.',
  'terminal_tackle_kit_thumbnail.jpg',
  'FishMaster',
  ARRAY['Tools', 'Fishing'],
  ARRAY['complete-kit', 'rigs']
);

-- Product 42
SELECT fn_create_product(
  'AnglerPro Trolling Motor Battery',
  'Deep cycle battery for powering trolling motors while fishing.',
  'trolling_motor_battery_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Accessories', 'Fishing'],
  ARRAY['deep-cycle', 'battery']
);

-- Product 43
SELECT fn_create_product(
  'TechFish Fish Attractor',
  'Electronic fish attractor for creating underwater feeding zones.',
  'fish_attractor_thumbnail.jpg',
  'TechFish',
  ARRAY['Accessories', 'Fishing'],
  ARRAY['electronic', 'fish-attracting']
);

-- Product 44
SELECT fn_create_product(
  'FishMaster Landing Net',
  'Durable and lightweight net for landing fish while fishing.',
  'landing_net_thumbnail.jpg',
  'FishMaster',
  ARRAY['Tools', 'Fishing'],
  ARRAY['durable', 'lightweight']
);

-- Product 45
SELECT fn_create_product(
  'AnglerWear Fishing Sungloves',
  'Fingerless gloves for sun protection while fishing.',
  'fishing_sungloves_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Clothing', 'Fishing'],
  ARRAY['fingerless', 'sun-protection']
);

-- Product 46
SELECT fn_create_product(
  'FishMaster Inflatable Boat',
  'Portable and inflatable boat for fishing in remote locations.',
  'inflatable_boat_thumbnail.jpg',
  'FishMaster',
  ARRAY['Watercraft', 'Fishing'],
  ARRAY['portable', 'inflatable']
);

-- Product 47
SELECT fn_create_product(
  'AnglerPro Fishing Line',
  'Strong and durable fishing line for all types of fishing.',
  'fishing_line_thumbnail.jpg',
  'AnglerPro',
  ARRAY['Tools', 'Fishing'],
  ARRAY['strong', 'durable']
);

-- Product 48
SELECT fn_create_product(
  'TechFish Fish Lip Gripper',
  'Sturdy and accurate tool for handling and weighing fish.',
  'fish_lip_gripper_thumbnail.jpg',
  'TechFish',
  ARRAY['Tools', 'Fishing'],
  ARRAY['sturdy', 'accurate']
);

-- Product 49
SELECT fn_create_product(
  'FishMaster Trolling Planer Board',
  'Adjustable planer board for trolling multiple lines while fishing.',
  'trolling_planer_board_thumbnail.jpg',
  'FishMaster',
  ARRAY['Tools', 'Fishing'],
  ARRAY['adjustable', 'trolling']
);

-- Product 50
SELECT fn_create_product(
  'AnglerWear Fishing Backpack',
  'Compact and waterproof backpack for fishing trips.',
  'fishing_backpack_thumbnail.jpg',
  'AnglerWear',
  ARRAY['Storage', 'Fishing'],
  ARRAY['compact', 'waterproof']
);
`;

const createProductIndexesList: number[] = sqlString
  .split('\n')
  .reduce((acc, line, i) => {
    line.startsWith('--') && acc.push(i);
    return acc;
  }, [] as number[]);

const createProductsList: string[] = createProductIndexesList.map(
  (index, i) => {
    const nextIndex = createProductIndexesList[i + 1] || sqlString.length;
    return sqlString.split('\n').slice(index, nextIndex).join('\n').trim();
  }
);

// console.log(createProductsList[0].split('\n'));

const newCreateProductsList = createProductsList.map((cp) => {
  const singleCreateProduct = cp.split('\n');
  return [
    ...singleCreateProduct.slice(0, 5),
    `  ${generateRandomPrice()},`,
    ...singleCreateProduct.slice(5),
  ];
});

fs.writeFileSync(
  './create_products.sql',
  newCreateProductsList.map((cp) => cp.join('\n')).join('\n\n')
);

function generateRandomPrice(): number {
  return +('' + (Math.floor(Math.random() * 100) + 1) + '.99');
}
