import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

interface TopCode {
    code: string;
    users: number;
    earnings: number;
    conversion: string;
}

interface TopCodesTableProps {
    codes: TopCode[];
}

export function TopCodesTable({ codes }: TopCodesTableProps) {
    return (
        <Card className="bg-card border-border">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Códigos Más Exitosos
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Código</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Usuarios</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ingresos</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Conversión</th>
                            </tr>
                        </thead>
                        <tbody>
                            {codes.map((code, index) => (
                                <tr key={code.code} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono font-medium text-foreground">{code.code}</span>
                                            {index === 0 && (
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded font-medium">
                                                    🏆 Top
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-foreground">{code.users}</td>
                                    <td className="py-3 px-4 text-foreground font-medium">${code.earnings}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">
                                            {code.conversion}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
