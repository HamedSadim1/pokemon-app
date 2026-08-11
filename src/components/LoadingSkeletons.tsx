import type { ReactNode } from "react";
import { POKEMON_CONFIG, SKELETON_CONFIG, UI_COPY } from "@/config";

interface SkeletonBlockProps {
  className?: string;
}

const SkeletonBlock = ({ className = "" }: SkeletonBlockProps) => (
  <span className={`skeleton-block ${className}`.trim()} aria-hidden="true" />
);

const SkeletonStatus = ({ message, children }: { message: string; children: ReactNode }) => (
  <div className="skeleton-status" role="status" aria-live="polite" aria-busy="true" aria-label={message}>
    <span className="visually-hidden">{message}</span>
    {children}
  </div>
);

const PokemonCardSkeleton = () => (
  <article className="pokemon-card pokemon-card-skeleton" aria-hidden="true">
    <div className="pokemon-card-top">
      <SkeletonBlock className="skeleton-number" />
      <div className="card-actions"><SkeletonBlock className="skeleton-icon" /></div>
    </div>
    <div className="pokemon-card-main">
      <div className="pokemon-art-wrap"><SkeletonBlock className="skeleton-pokemon-art" /></div>
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
      {Array.from({ length: POKEMON_CONFIG.itemsPerPage }, (_, index) => <PokemonCardSkeleton key={index} />)}
    </div>
    <div className="pagination pagination-skeleton">
      <SkeletonBlock className="skeleton-pagination-button" />
      <SkeletonBlock className="skeleton-pagination-status" />
      <SkeletonBlock className="skeleton-pagination-button" />
    </div>
  </div>
);

export const PokemonListSkeleton = ({ message = UI_COPY.loading.pokemonList }: { message?: string }) => (
  <SkeletonStatus message={message}><PokemonListSkeletonContent /></SkeletonStatus>
);

export const PokemonPageSkeleton = ({ message = UI_COPY.loading.pokedex }: { message?: string }) => (
  <SkeletonStatus message={message}>
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
  </SkeletonStatus>
);

const DetailSectionSkeleton = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <section className={`detail-section detail-section-skeleton ${className}`.trim()}>{children}</section>
);

export const PokemonDetailSkeleton = () => (
  <SkeletonStatus message={UI_COPY.loading.profile}>
    <section className="detail-page detail-page-skeleton" aria-hidden="true">
      <div className="page-container">
        <SkeletonBlock className="skeleton-breadcrumb" />
        <div className="detail-hero detail-hero-skeleton">
          <div className="detail-art detail-art-skeleton"><SkeletonBlock className="skeleton-detail-art" /></div>
          <div className="detail-info">
            <SkeletonBlock className="skeleton-detail-number" />
            <SkeletonBlock className="skeleton-detail-title" />
            <SkeletonBlock className="skeleton-detail-genus" />
            <div className="type-list skeleton-type-list">
              <SkeletonBlock className="skeleton-type-pill" />
              <SkeletonBlock className="skeleton-type-pill skeleton-type-pill-short" />
            </div>
            {Array.from({ length: SKELETON_CONFIG.descriptionLines }, (_, index) => (
              <SkeletonBlock className={`skeleton-detail-description${index === 0 ? " skeleton-detail-description-first" : ""}${index === SKELETON_CONFIG.descriptionLines - 1 ? " skeleton-detail-description-short" : ""}`} key={index} />
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
              {Array.from({ length: SKELETON_CONFIG.measureCount }, (_, index) => <div className="measure" key={index}><SkeletonBlock className="skeleton-measure-label" /><SkeletonBlock className="skeleton-measure-value" /></div>)}
            </div>
          </DetailSectionSkeleton>
          <DetailSectionSkeleton>
            <SkeletonBlock className="skeleton-section-title" />
            <div className="skeleton-metadata-list">
              {Array.from({ length: SKELETON_CONFIG.metadataCount }, (_, index) => <div key={index}><SkeletonBlock className="skeleton-metadata-label" /><SkeletonBlock className="skeleton-metadata-value" /></div>)}
            </div>
          </DetailSectionSkeleton>
          <DetailSectionSkeleton>
            <SkeletonBlock className="skeleton-section-title" />
            <div className="detail-list">{Array.from({ length: SKELETON_CONFIG.abilityChips }, (_, index) => <SkeletonBlock className="skeleton-chip" key={index} />)}</div>
          </DetailSectionSkeleton>
          <DetailSectionSkeleton>
            <SkeletonBlock className="skeleton-section-title" />
            <div className="detail-list">{Array.from({ length: POKEMON_CONFIG.visibleMoves }, (_, index) => <SkeletonBlock className="skeleton-chip" key={index} />)}</div>
          </DetailSectionSkeleton>
          <DetailSectionSkeleton className="full-width evolution-section-skeleton">
            <SkeletonBlock className="skeleton-section-title" />
            <div className="evolution-viewport">
              <div className="evolution-paths">
                <div className="skeleton-evolution-list">
                  {Array.from({ length: SKELETON_CONFIG.evolutionSteps }, (_, index) => (
                    <div className="skeleton-evolution-step" key={index}>
                      {index > 0 && <SkeletonBlock className="skeleton-evolution-arrow" />}
                      <div className="skeleton-evolution-card">
                        <SkeletonBlock className="skeleton-evolution-art" />
                        <SkeletonBlock className="skeleton-evolution-number" />
                        <SkeletonBlock className="skeleton-evolution-name" />
                        <SkeletonBlock className="skeleton-evolution-requirement" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="evolution-swipe-hint">{UI_COPY.shared.swipeHint}</p>
            </div>
          </DetailSectionSkeleton>
          <DetailSectionSkeleton className="full-width">
            <SkeletonBlock className="skeleton-section-title" />
            {Array.from({ length: SKELETON_CONFIG.statRows }, (_, index) => <div className="skeleton-stat-row" key={index}><div className="stat-label"><SkeletonBlock className="skeleton-stat-label" /><SkeletonBlock className="skeleton-stat-value" /></div><SkeletonBlock className="skeleton-stat-track" /></div>)}
          </DetailSectionSkeleton>
        </div>
      </div>
    </section>
  </SkeletonStatus>
);
