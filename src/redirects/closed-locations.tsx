/**
 * This is an example of how to create an entity redirect set that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a redirect set in
 * concert with a stream is built by the Yext Sites system, a set of redirects
 * are generated for every corresponding stream document stream document (based on the filter).
 */

import {
    GetDestination,
    GetSources,
    TemplateConfig,
    TemplateProps,
  } from "@yext/pages";
  import * as React from "react";
  import "../index.css";
  
  /**
   * Required when Knowledge Graph Stream is used for a template.
   */
  export const config: TemplateConfig = {
    stream: {
      $id: "closed-location",
      fields: [
        "id",
        "name",
        "slug"
      ],
      filter: {
        savedFilterIds: ["1383774498"],
      },
      localization: {
        locales: ["en"],
      },
    },
  };
  
  /**
   * Defines the URL to redirect the source paths to.
   */
  export const getDestination: GetDestination<TemplateProps> = ({ document }) => {
    return `index.html`;
  };
  
  
  /**
   * Defines a list of redirect source objects, which will redirect to the URL created by getDestination.
   */
  export const getSources: GetSources<TemplateProps> = ({ document }) => {
    return [
       {
          "source": `${document.slug}`,
          "status": 301
       },
   ];
  };
  