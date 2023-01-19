export interface IGif {
  type: 'video' | 'gif' | 'text';
  id: string | number;
  slug: string;
  url: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_indexable: boolean;
  is_sticker: boolean;
  import_datetime: string;
  trending_datetime: string;
  user: IUser;
  images: IImages;
  title: string;
  is_hidden: boolean;
  is_scheduled: boolean;
  is_removed: boolean;
  tags: string[];
  bottle_data: IBottleData;
  analytics_response_payload: string;
  video?: IVideo;
}

interface IPublicUser {
  username: string;
  id: number;
  avatar_url: string;
  is_verified: boolean;
}

interface IUser extends IPublicUser {
  about_bio: string;
  display_name: string;
  user_type: 'partner' | 'artist' | 'user' | 'anonymous';
  is_public: boolean;
  primary_site?: string;
  twitter: string;
  facebook: string;
  instagram: string;
  tumblr_site: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  tumblr_url?: string;
  website_url?: string;
}

interface IImages {
  fixed_height_still: IImage;
  original_still: IImage;
  fixed_width: ImageAllTypes;
  fixed_height_small_still: IImage;
  fixed_height_downsampled: IImage & IWebP;
  preview: IImage;
  fixed_height_small: ImageAllTypes;
  downsized_still: IImage;
  downsized: IImage;
  downsized_large: IImage;
  fixed_width_small_still: IImage;
  preview_webp: IImage;
  fixed_width_still: IImage;
  fixed_width_small: ImageAllTypes;
  downsized_small: IImage & IMP4;
  fixed_width_downsampled: IImage & IWebP;
  downsized_medium: IImage;
  original: ImageAllTypes;
  fixed_height: ImageAllTypes;
  looping: IMP4;
  original_mp4: IMP4;
  preview_gif: IImage;
  '480w_still': IImage;
}

interface IRendition {
  width: number;
  height: number;
}

interface IImage extends IRendition {
  url: string;
  size?: string;
}

interface IMP4 extends IRendition {
    mp4: string;
    mp4_size: string;
}

interface IWebP {
    webp: string;
    webp_size: string;
}

type ImageAllTypes = IImage & IWebP & IMP4;

interface IBottleData {
  tid?: string;
  tags?: string[];
}

export type IURLAsset = IImage

interface IVideoAssets {
  source: IURLAsset;
  '360p': IURLAsset;
  '480p': IURLAsset;
  '720p': IURLAsset;
  '1080p': IURLAsset;
  '4k': IURLAsset;
}

type Language = 'en' | 'fr' | 'sp' | 'it' | 'de';

interface ICaption {
  srt: string;
  vtt: string;
}

interface IVideo {
  assets: IVideoAssets;
  description: string;
  dash_manifest_url: string;
  hls_manifest_url: string;
  previews: IImages;
  captions?: Partial<Record<Language, ICaption>>;
  native: Language;
}
