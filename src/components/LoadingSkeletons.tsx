import type { ReactNode } from "react";

interface SkeletonBlockProps {
  className?: string;
}

const SkeletonBlock = ({ className = "" }: SkeletonBlockProps) => (
  <span className={`skeleton-block ${className}`.trim()} aria-hidden="true" />
);

const PokemonCardSkeleton = () => (
  <article className="pokemon-card pokemon-card-skeleton" aria-hidden="true">
    <div className="pokemon-card-top">
      <SkeletonBlock className="skeleton-number" />
      <div className="card-actions">
        <SkeletonBlock className="skeleton-icon" />
      </div>
    </div>
    <div className="pokemon-card-main">
      <div className="pokemon-art-wrap">
        <SkeletonBlock className="skeleton-pokemon-art" />
      </div>
      <div className="pokemon-card-content">
        <SkeletonBlock className="skeleton-card-title" />
        <SkeletonBlock className="skeleton-card-copy" />
        <SkeletonBlock className="skeleton-card-arrow" />
      </div>
    </div>
  </article>
);

const PokemonListSkeletonContent = () => (
  <div aria-hidden="true">
    <div className="pokemon-grid pokemon-grid-skeleton">
      {Array.from({ length: 20 }, (_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
    <div className="pagination pagination-skeleton">
      <SkeletonBlock className="skeleton-pagination-button" />
      <SkeletonBlock className="skeleton-pagination-status" />
      <SkeletonBlock className="skeleton-pagination-button" />
    </div>
  </div>
);

export const PokemonListSkeleton = ({
  message = "Loading Pokémon list",
}: { message?: string }) => (
  <div
    className="skeleton-status"
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label={message}
  >
    <span className="visually-hidden">{message}</span>
    <PokemonListSkeletonContent />
  </div>
);

export const PokemonPageSkeleton = ({
  message = "Loading the Pokédex",
}: { message?: string }) => (
  <div
    className="skeleton-status"
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label={message}
  >
    <span className="visually-hidden">{message}</span>
    <section className="pokedex-page pokemon-page-skeleton" aria-hidden="true">
      <div className="page-container">
        <div className="pokemon-page-skeleton-heading">
          <SkeletonBlock className="skeleton-page-kicker" />
          <SkeletonBlock className="skeleton-page-title" />
          <SkeletonBlock className="skeleton-page-intro" />
          <SkeletonBlock className="skeleton-page-intro skeleton-page-intro-short" />
        </div>

        <div className="list-toolbar pokemon-toolbar-skeleton">
          <SkeletonBlock className="skeleton-toolbar-meta" />
          <SkeletonBlock className="skeleton-toolbar-search" />
        </div>

        <PokemonListSkeletonContent />
      </div>
    </section>
  </div>
);

const DetailSectionSkeleton = ({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <section className={`detail-section detail-section-skeleton ${className}`.trim()}>
    {children}
  </section>
);

export const PokemonDetailSkeleton = () => (
  <div
    className="skeleton-status"
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label="Loading Pokémon profile"
  >
    <span className="visually-hidden">Loading Pokémon profile</span>
    <section className="detail-page detail-page-skeleton" aria-hidden="true">
      <div className="page-container">
        <SkeletonBlock className="skeleton-breadcrumb" />

      <div className="detail-hero detail-hero-skeleton">
        <div className="detail-art detail-art-skeleton">
          <SkeletonBlock className="skeleton-detail-art" />
        </div>
        <div className="detail-info">
          <SkeletonBlock className="skeleton-detail-number" />
          <SkeletonBlock className="skeleton-detail-title" />
          <SkeletonBlock className="skeleton-detail-genus" />
          <div className="type-list skeleton-type-list">
            <SkeletonBlock className="skeleton-type-pill" />
            <SkeletonBlock className="skeleton-type-pill skeleton-type-pill-short" />
          </div>
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonBlock
              className={`skeleton-detail-description${index === 0 ? " skeleton-detail-description-first" : ""}${index === 3 ? " skeleton-detail-description-short" : ""}`}
              key={index}
            />
          ))}
          <div className="detail-actions skeleton-detail-actions">
            <SkeletonBlock className="skeleton-detail-button" />
            <SkeletonBlock className="skeleton-detail-button skeleton-detail-button-quiet" />
          </div>
        </div>
      </div>

      <div className="detail-sections detail-sections-skeleton">
        <DetailSectionSkeleton>
          <SkeletonBlock className="skeleton-section-title" />
          <div className="measure-grid">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="measure" key={index}>
                <SkeletonBlock className="skeleton-measure-label" />
                <SkeletonBlock className="skeleton-measure-value" />
              </div>
            ))}
          </div>
        </DetailSectionSkeleton>
        <DetailSectionSkeleton>
          <SkeletonBlock className="skeleton-section-title" />
          <div className="skeleton-metadata-list">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index}>
                <SkeletonBlock className="skeleton-metadata-label" />
                <SkeletonBlock className="skeleton-metadata-value" />
              </div>
            ))}
          </div>
        </DetailSectionSkeleton>
        <DetailSectionSkeleton>
          <SkeletonBlock className="skeleton-section-title" />
          <div className="detail-list">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonBlock className="skeleton-chip" key={index} />
            ))}
          </div>
        </DetailSectionSkeleton>
        <DetailSectionSkeleton>
          <SkeletonBlock className="skeleton-section-title" />
          <div className="detail-list">
            {Array.from({ length: 16 }, (_, index) => (
              <SkeletonBlock className="skeleton-chip" key={index} />
            ))}
          </div>
        </DetailSectionSkeleton>
        <DetailSectionSkeleton className="full-width evolution-section-skeleton">
          <SkeletonBlock className="skeleton-section-title" />
          <div className="evolution-viewport">
            <div className="evolution-paths">
              <div className="skeleton-evolution-list">
                {Array.from({ length: 3 }, (_, index) => (
                  <div className="skeleton-evolution-card" key={index}>
                    <SkeletonBlock className="skeleton-evolution-art" />
                    <SkeletonBlock className="skeleton-evolution-number" />
                    <SkeletonBlock className="skeleton-evolution-name" />
                  </div>
                ))}
              </div>
            </div>
            <p className="evolution-swipe-hint">Swipe to view the full path</p>
          </div>
        </DetailSectionSkeleton>
        <DetailSectionSkeleton className="full-width">
          <SkeletonBlock className="skeleton-section-title" />
          {Array.from({ length: 6 }, (_, index) => (
            <div className="skeleton-stat-row" key={index}>
              <div className="stat-label">
                <SkeletonBlock className="skeleton-stat-label" />
                <SkeletonBlock className="skeleton-stat-value" />
              </div>
              <SkeletonBlock className="skeleton-stat-track" />
            </div>
          ))}
        </DetailSectionSkeleton>
      </div>
    </div>
    </section>
  </div>
);
