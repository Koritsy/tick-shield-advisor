import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Shield, Leaf, DollarSign, HeartPulse, Wrench, Clock, CheckCircle2, AlertTriangle, ChevronDown } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import type { Intervention, AspectEvidenceQuality } from '@/data/interventions';

interface ComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interventions: Intervention[];
}

const EvidenceBadge = ({ quality }: { quality: AspectEvidenceQuality }) => {
  if (quality === 'na') return null;
  if (quality === 'strong') return <CheckCircle2 className="h-3 w-3 text-emerald-600 inline ml-1" />;
  return <AlertTriangle className="h-3 w-3 text-amber-500 inline ml-1" />;
};

const levelColors: Record<string, string> = {
  high: 'bg-effectiveness-high/10 text-effectiveness-high',
  medium: 'bg-effectiveness-medium/10 text-effectiveness-medium',
  low: 'bg-effectiveness-low/10 text-effectiveness-low',
  unknown: 'bg-effectiveness-unknown/10 text-effectiveness-unknown',
  safe: 'bg-eco-safe/10 text-eco-safe',
  caution: 'bg-eco-caution/10 text-eco-caution',
  risk: 'bg-eco-risk/10 text-eco-risk',
  easy: 'bg-eco-safe/10 text-eco-safe',
  hard: 'bg-eco-risk/10 text-eco-risk',
  once: 'bg-eco-safe/10 text-eco-safe',
  seasonal: 'bg-effectiveness-medium/10 text-effectiveness-medium',
  regular: 'bg-eco-caution/10 text-eco-caution',
  frequent: 'bg-eco-risk/10 text-eco-risk',
};

const labels: Record<string, string> = {
  high: 'Élevée', medium: 'Moyenne', low: 'Faible', unknown: 'Inconnue',
  safe: 'Sûr', caution: 'Prudence', risk: 'Risque',
  easy: 'Facile', hard: 'Difficile',
  once: 'Une fois', seasonal: 'Saisonnier', regular: 'Régulier', frequent: 'Fréquent',
};

const ComparisonModal = ({ open, onOpenChange, interventions }: ComparisonModalProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  if (interventions.length === 0) return null;

  const toggleRow = (label: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const rows: {
    label: string;
    icon: React.ReactNode;
    getValue: (i: Intervention) => { level: string; evidence?: AspectEvidenceQuality };
    getDetails: (i: Intervention) => string;
  }[] = [
    { label: 'Efficacité', icon: <Shield className="h-4 w-4" />, getValue: (i) => ({ level: i.effectiveness, evidence: i.effectivenessEvidence }), getDetails: (i) => i.effectivenessDetails },
    { label: 'Impact éco.', icon: <Leaf className="h-4 w-4" />, getValue: (i) => ({ level: i.environmentalImpact, evidence: i.environmentalEvidence }), getDetails: (i) => i.environmentalDetails },
    { label: 'Coût', icon: <DollarSign className="h-4 w-4" />, getValue: (i) => ({ level: i.cost }), getDetails: (i) => `${i.costDetails}. Investissement annuel : ${i.annualInvestment}` },
    { label: 'Santé', icon: <HeartPulse className="h-4 w-4" />, getValue: (i) => ({ level: i.healthSafety, evidence: i.healthEvidence }), getDetails: (i) => i.healthRisks },
    { label: 'Facilité', icon: <Wrench className="h-4 w-4" />, getValue: (i) => ({ level: i.easeOfUse }), getDetails: (i) => i.easeOfUseDetails },
    { label: 'Fréquence', icon: <Clock className="h-4 w-4" />, getValue: (i) => ({ level: i.applicationFrequency }), getDetails: (i) => i.applicationFrequencyDetails },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comparaison des solutions</DialogTitle>
          <DialogDescription>
            {interventions.length} solutions sélectionnées — cliquez sur un critère pour voir les détails
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Critère</TableHead>
                {interventions.map((i) => (
                  <TableHead key={i.id} className="min-w-[140px] text-center">
                    <span className="text-xs font-bold">{i.nameFr}</span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-xs">Preuves globales</TableCell>
                {interventions.map((i) => (
                  <TableCell key={i.id} className="text-center">
                    <Badge
                      variant={i.evidenceQuality === 'strong' ? 'default' : 'secondary'}
                      className={`text-xs ${i.evidenceQuality === 'weak' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : ''}`}
                    >
                      {i.evidenceQuality === 'strong' ? 'Solides' : 'Limitées'}
                    </Badge>
                  </TableCell>
                ))}
              </TableRow>
              {rows.map((row) => {
                const isExpanded = expandedRows.has(row.label);
                return (
                  <>
                    <TableRow
                      key={row.label}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleRow(row.label)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {row.icon}
                          <span className="text-xs font-medium">{row.label}</span>
                          <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </TableCell>
                      {interventions.map((i) => {
                        const { level, evidence } = row.getValue(i);
                        return (
                          <TableCell key={i.id} className="text-center">
                            <Badge variant="outline" className={`text-xs ${levelColors[level] || ''}`}>
                              {labels[level] || level}
                              {evidence && <EvidenceBadge quality={evidence} />}
                            </Badge>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {isExpanded && (
                      <TableRow key={`${row.label}-details`} className="bg-muted/30">
                        <TableCell className="text-xs text-muted-foreground italic">Détails</TableCell>
                        {interventions.map((i) => (
                          <TableCell key={i.id} className="text-xs text-muted-foreground">
                            {row.getDetails(i)}
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal;
