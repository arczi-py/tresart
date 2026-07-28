export const landingSanityQuery = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    brandName,
    logo{ asset->{ url } },
    phone,
    phoneHref,
    email,
    emailHref,
    address,
    socialLinks[]{ label, href, icon }
  },
  "landingSections": {
    "seo": *[_type == "landingSeoSection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      seo{
        title,
        description,
        image{ asset->{ url } }
      }
    },
    "hero": *[_type == "landingHeroSection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      hero
    },
    "audience": *[_type == "landingAudienceSection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      section,
      items[]{ slot, number, title, description }
    },
    "foundry": *[_type == "landingFoundrySection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      section,
      items[]{ slot, type, number, label, metric, unit, title, description, swatches, tag }
    },
    "manifest": *[_type == "landingManifestSection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      introText,
      introBeforeBrand,
      introAfterBrand,
      marquee,
      manifest{
        stats[]{ slot, label, value },
        cards[]{ slot, label, description }
      }
    },
    "work": *[_type == "landingWorkSection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      section,
      ctaText,
      ctaLabel,
      items[]{
        slot,
        number,
        layoutClass,
        seed,
        image{ asset->{ url } },
        imageUrl,
        imageAlt,
        category,
        title,
        author
      }
    },
    "files": *[_type == "landingFilesSection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      files{
        eyebrow,
        heading,
        description,
        ctaLabel,
        types[]{ slot, label, extension, description },
        checklist[]{ slot, label, description }
      }
    },
    "process": *[_type == "landingProcessSection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      section,
      badge,
      steps[]{ slot, number, icon, title, tag }
    },
    "collaboration": *[_type == "landingCollaborationSection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      collaboration{
        eyebrow,
        heading,
        description,
        benefits[]{ slot, text }
      }
    },
    "contact": *[_type == "landingContactSection"]{
      _id,
      "language": select(_id match "*-pl" => "pl", _id match "*-en" => "en", _id match "*-de" => "de", "pl"),
      contact
    }
  },
  "landingPage": *[_type == "landingPage"][0]{
    seo{
      title,
      description,
      image{ asset->{ url } }
    },
    hero,
    audienceSection,
    foundrySection,
    workSection,
    processSection,
    manifest{
      stats,
      cards
    },
    audience[]{
      number,
      title,
      description
    },
    foundry[]{
      type,
      number,
      label,
      metric,
      unit,
      title,
      description,
      swatches,
      tag
    },
    work[]{
      number,
      layoutClass,
      seed,
      image{ asset->{ url } },
      imageUrl,
      imageAlt,
      category,
      title,
      author
    },
    files{
      eyebrow,
      heading,
      description,
      ctaLabel,
      types,
      checklist
    },
    process[]{
      number,
      icon,
      title,
      tag
    },
    collaboration{
      eyebrow,
      heading,
      description,
      benefits
    },
    contact
  }
}`
