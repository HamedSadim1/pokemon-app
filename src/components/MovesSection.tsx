import type { Move } from "./Services/IPokemon";
import DetailChips from "./DetailChips";
import DetailSection from "./DetailSection";
import { UI_COPY } from "../config";

interface MovesSectionProps {
  moves: Move[];
  totalMoves: number;
}

const MovesSection = ({ moves, totalMoves }: MovesSectionProps) => (
  <DetailSection title="Known moves">
    <DetailChips
      items={moves.flatMap((move) =>
        move.move?.name
          ? [{ key: move.move.name, content: move.move.name }]
          : [],
      )}
      emptyLabel={UI_COPY.detail.emptyMoves}
    />
    {totalMoves > moves.length && (
      <p className="section-note">Showing {moves.length} of {totalMoves} moves.</p>
    )}
  </DetailSection>
);

export default MovesSection;
