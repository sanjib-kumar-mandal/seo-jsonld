# SEO JSONLD
Search engines works hard to understand the content of a page. We can help them by providing explicit clues about the meaning of a page by including structured data on the page. Structured data is a standardized format for providing information about a page and classifying the page content.
## Search Engine Support

- Google
    - [Document](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
    - [Test your implementation](https://search.google.com/test/rich-results)

## Rules 
- [Schema.org](https://schema.org/)

## Google Search Topics Covered
- [Article](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Course list](https://developers.google.com/search/docs/appearance/structured-data/course)
- [COVID-19 announcement](https://developers.google.com/search/docs/appearance/structured-data/special-announcements)
- [Dataset](https://developers.google.com/search/docs/appearance/structured-data/dataset)
- [Education Q&A](https://developers.google.com/search/docs/appearance/structured-data/education-qa)
- [Event](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Fact check](https://developers.google.com/search/docs/appearance/structured-data/factcheck)
- [FAQ](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Job posting](https://developers.google.com/search/docs/appearance/structured-data/job-posting)
- [Local business](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Logo](https://developers.google.com/search/docs/appearance/structured-data/logo)
- [Movie carousel](https://developers.google.com/search/docs/appearance/structured-data/movie)
- [Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Software App](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Sitelinks search box](https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox)
- [Video](https://developers.google.com/search/docs/appearance/structured-data/video)

## Install
`npm i seo-jsonld --save`

## Options for methods

- Artical
  - Method Name: `artical`
  - Input Format: `ArticalStructuredData | Array<ArticalStructuredData>`

- Breadcrumb
  - Method Name: `breadCrump`
  - Input Format: `BreadcrumbStructureData | Array<BreadcrumbStructureData>`

- Course List
  - Method Name: `course`
  - Input Format: `CourseStructureData | Array<CourseStructureData>`

- COVID-19 announcement
  - Method Name: `covid19`
  - Input Format: `Covid19StructuredData | Array<Covid19StructuredData>`

- Dataset
  - Method Name: `dataSet`
  - Input Format: `DatasetStructureData | Array<DatasetStructureData>`

- Education Q&A
  - Method Name: `educationalQA`
  - Input Format: `EducationalQAStructuredData | Array<EducationalQAStructuredData>`

- Event
  - Method Name: `event`
  - Input Format: `EventStructuredData | Array<EventStructuredData>`

- Fact Check
  - Method Name: `factCheck`
  - Input Format: `FactCheckStructuredData | Array<FactCheckStructuredData>`

- FAQ
  - Method Name: `faq`
  - Input Format: `FAQStructuredData | Array<FAQStructuredData>`

- Job Posting
  - Method Name: `jobPosting`
  - Input Format: `JobPostingStructureData | Array<JobPostingStructureData>`

- Learning Video
  - Method Name: `learningVideo`
  - Input Format: `LearningVideoStructuredData | Array<LearningVideoStructuredData>`

- Local business
  - Method Name: `localBusiness`
  - Input Format: `LocalBusinessStructuredData | Array<LocalBusinessStructuredData>`

- Logo
  - Method Name: `logo`
  - Input Format: `LogoStructuredData | Array<LogoStructuredData>`

- Movie
  - Method Name: `movie`
  - Input Format: `Array<MovieStructuredData>`

- Review
  - Method Name: `review`
  - Input Format: `ReviewStructuredData | Array<ReviewStructuredData>`

- Sitelinks Search
  - Method Name: `searchBox`
  - Input Format: `SearchBoxStructuredData`

- Software App
  - Method Name: `softwareApplication`
  - Input Format: `SoftwareApplicationStructureData | Array<SoftwareApplicationStructureData>`

- Video
  - Method Name: `video`
  - Input Format: `VideoStructureData | Array<VideoStructureData>`

## Example of usage
```
  import { SeoJsonLd, appendToHeadElement } from 'seo-jsonld';
  import { StructureDataType } from 'seo-jsonld/dist/types/types';

  export class JsonLdConverter {

    private jsonLd = new SeoJsonLd();

    loadData(data: any, type: StructureDataType): void {
      const map = {
        "artical": this.jsonLd.artical,
        "course": this.jsonLd.course,
        "covid-19": this.jsonLd.covid19,
        "dataset": this.jsonLd.dataSet,
        "educational-qa": this.jsonLd.educationalQA,
        "event": this.jsonLd.event,
        "fact-check": this.jsonLd.factCheck,
        "faq": this.jsonLd.faq,
        "job-posting": this.jsonLd.jobPosting,
        "learning-video": this.jsonLd.learningVideo,
        "local-business": this.jsonLd.localBusiness,
        "logo": this.jsonLd.logo,
        "movie": this.jsonLd.movie,
        "review": this.jsonLd.review,
        "search-box": this.jsonLd.searchBox,
        "software-application": this.jsonLd.softwareApplication,
        "video": this.jsonLd.video
      };
      const result = map[type](data);
      // To attach to the document open below line
      // appendToHeadElement({ data: result, document, type });
    }

  }
```