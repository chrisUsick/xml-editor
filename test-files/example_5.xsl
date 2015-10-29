<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output omit-xml-declaration="yes" indent="yes"/>
    <xsl:template match="/maintenanceOrder">
        <html>
            <body>
                <h2>Maintain Machine</h2>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th style="text-align:left">Part Name</th>
                        <th style="text-align:left">Comment </th>
                    </tr>
                    <xsl:for-each select="machineToInspect/machine">
                        <tr>
                            <td>
                                <xsl:value-of select="partName"/>
                            </td>
                            <td>
                                <xsl:value-of select="comment"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
