import type { Tile } from '@/types/tile';
import { CardContent, Card } from '@/components/ui/card';
import Image from '@/components/Image';
import configs from '@/config';

const awsCloudfrontTilesBaseUrl = configs.awsCloudfrontTilesBaseUrl.value;
const TileCard = ({ code, dimension, s3Key }: Tile) => {
  return (
    <Card className="bg-black text-white p-0 overflow-hidden rounded-none border-none gap-0">
      <div className="w-full">
        <Image
          src={`${awsCloudfrontTilesBaseUrl}/${s3Key}`}
          alt={code}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="text-center p-2">
        <div className="font-semibold text-sm">{code}</div>
        <div className="text-xs">{dimension}</div>
      </CardContent>
    </Card>
  );
};

export default TileCard;
