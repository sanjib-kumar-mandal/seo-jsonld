export type StructureDataType = 'video' | 'software-application' | 'dataset' | 'faq' | 'educational-qa' | 'event' | 'artical' | 'course' | 'job-posting' | 'local-business' | 'logo' | 'movie' | 'review' | 'covid-19';
export type AddressType = 'PostalAddress' | string;
export type Author = 'Person' | 'Organization' | string;
export type Creator = 'Person' | 'Organization' | string;
export type Publisher = 'Person' | 'Organization' | string;
export type Employment = 'CONTRACTOR' | 'FULL_TIME' | 'PART_TIME' | 'TEMPORARY' | 'INTERN' | 'VOLUNTEER' | 'PER_DIEM' | 'OTHER' | string;
export type Education = 'high school' | 'associate degree' | 'bachelor degree' | 'professional certificate' | 'postgraduate degree' | string;
export type WorkTimeUnit = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
export type WeekDays = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type ApplicationCategory = 'GameApplication' | 'SocialNetworkingApplication' | 'TravelApplication' | 'ShoppingApplication' | 'SportsApplication' | 'LifestyleApplication' | 'BusinessApplication' | 'DesignApplication' | 'DeveloperApplication' | 'DriverApplication' | 'EducationalApplication' | 'HealthApplication' | 'FinanceApplication' | 'SecurityApplication' | 'BrowserApplication' | 'CommunicationApplication' | 'DesktopEnhancementApplication' | 'EntertainmentApplication' | 'MultimediaApplication' | 'HomeApplication' | 'UtilitiesApplication' | 'ReferenceApplication' | string;
export type Review = 'Restaurant' | 'Book' | 'Course' | 'Movie' | 'Product' | 'Recipe' | 'Software App' | 'CreativeWorkSeason' | 'CreativeWorkSeries' | 'Episode' | 'Game' | 'MediaObject' | 'MusicPlaylist' | 'MusicRecording' | 'Organization' | 'Local business' | 'How-to' | 'Event' | string;