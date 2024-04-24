import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import About from "../components/About";
import Banner from "../components/Banner";
import Details from "../components/Details";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import BreadCrumbs from "../components/Breadcrumbs";


export const config: TemplateConfig = {
  stream: {
    $id: "location-stream",
    filter: {
      savedFilterIds: [YEXT_PUBLIC_LOCATIONS_SFID],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
      "photoGallery",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
    ],
    localization: {
      locales: ["en"],
    },
    transform: {
      replaceOptionValuesWithDisplayNames: ["paymentOptions"],
    },
  },
  pageUrlField: "c_pagesURL"
};


export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

// export const getPath: GetPath<TemplateProps> = ({ document }) => {
//   return document.c_slugV2
//     ? document.c_slugV2
//     : `${document.locale}/${document.address.region}/${document.address.city}/${
//         document.address.line1
//       }-${document.id.toString()}`;
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};


export const transformProps: TransformProps<any> = async (data) => {
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
  };
};


const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
  __meta
}) => {
  const {
    name,
    address,
    hours,
    mainPhone,
    services,
    description,
    dm_directoryParents,
  } = document;

  return (
    <>
      <PageLayout templateData={{__meta, document}}>
        <Banner name={name} address={address} />
        <div className="centered-container">
          <BreadCrumbs
            breadcrumbs={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            <Details address={address} phone={mainPhone} services={services} />
            {hours && <Hours title={"Restaurant Hours"} hours={hours} />}
            {description && <About name={name} description={description} />}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
